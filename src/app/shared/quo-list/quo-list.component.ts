import {
  Component, OnDestroy, OnInit, ViewChild, ContentChild, TemplateRef, Input, ElementRef, EventEmitter, Output,
  Renderer, Renderer2, AfterViewInit
} from '@angular/core';
import {QuoListItemSelectDirective} from './quo-list-directive';
import * as _ from 'underscore';
import {HeaderItem} from './quo-list.model';

declare var $: any;

@Component({
  selector: 'app-quo-list',
  templateUrl: './quo-list.component.html',
  styleUrls: ['./quo-list.component.scss']
})

export class QuoListComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Public Variables */
  public localDataSource: any = [];
  public sortColumnName = '';
  public isSelected: boolean;
  /** Input Decorators */
  @Input() itemClassName = '';
  @Input() headerItems: Array<HeaderItem>;
  @Input() height: any;
  @Input() width: any;
  @Input() serverSidePagination = false;
  @Input() totalRecord: number;
  @Input() clearDataSource = false;
  @Input() widthInPerc = false;
  @Input() totalCount: number;
  @Input() tasksPerPage: number;
  @Input() showPagination = true;
  @Input() headerClass = 'display-table';
  @Input() headerItemTotal = [];
  @Input() showHeaderTotal = false;
  @Input() showCheckbox = true;
  @Input() page = 1;
  /** Output Decorators */
  @Output() public sort: EventEmitter<HeaderItem> = new EventEmitter();
  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  @Output() public selectedItems: EventEmitter<any> = new EventEmitter();
  /** Child Decorators */
  @ViewChild('checkBoxLabel', {static: false}) checkBoxLabel: ElementRef;
  @ContentChild(QuoListItemSelectDirective, {
    read: TemplateRef,
    static: true
  }) templateOption: QuoListItemSelectDirective;
  private currentPageIndex = 0;
  private selectedRows = [];
  @ViewChild('scrollContainer', {static: true}) private scrollContainer: ElementRef;
  /** Private Variables */
  private dataSourceInput: any[];

  constructor(private renderer2: Renderer2,
              private renderer: Renderer,
              private el: ElementRef) {


  }

  get dataSource(): any {
    return this.dataSourceInput;
  }

  /** Control-Input Accessors */

  @Input('dataSource')
  set dataSource(dataSource: any) {
    this.dataSourceInput = dataSource;
    this.resetCheckboxState();
    this.refreshDataSource(this.dataSourceInput);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.focus();
      this.renderer.invokeElementMethod(this.scrollContainer.nativeElement, 'scrollIntoViewIfNeeded');
    }
  }


  public refreshDataSource(dataSource: any, isClearDataSource: boolean = false) {
    if (isClearDataSource === true || this.clearDataSource === true) {
      this.localDataSource = [];
    }
    if (dataSource && dataSource.length > 0) {
      if (this.clearDataSource) {
        this.localDataSource = [];
      }
      const maxIndex = this.localDataSource.length - 1;
      this.localDataSource = dataSource;
      // dataSource.forEach((element:any) => {
      //     maxIndex = maxIndex + 1;
      //     element.index = maxIndex;
      //     this.localDataSource.push(element);
      // });
      this.localDataSource[0].active = true;
    } else {
      this.localDataSource = dataSource;
    }
  }

  onSort(headerItem: any) {
    if (this.sortColumnName !== headerItem.title) {
      this.headerItems.forEach(item => {
        if (item.title === this.sortColumnName) {
          item.sortClassName = 'icon-Sorting';
          item.sortOrder = 'DESC';
        }
      });
    }
    if (headerItem.sortOrder === null || headerItem.sortOrder === 'DESC') {
      headerItem.sortOrder = 'DESC';
      headerItem.sortClassName = 'arrow-up';
    } else {
      headerItem.sortOrder = 'DESC';
      headerItem.sortClassName = 'arrow-down';
    }
    this.sortColumnName = headerItem.title;
    if (this.serverSidePagination) {
      this.sort.emit(headerItem);
    } else {
      if (headerItem.sortOrder === 'ASC') {
        this.localDataSource = _.sortBy(this.localDataSource, headerItem.sortHeaderBy);
      } else {
        this.localDataSource = _.sortBy(this.localDataSource, headerItem.sortHeaderBy).reverse();
      }
    }
  }

  public clear() {
    this.localDataSource = [];
    this.dataSourceInput = [];
  }

  // raise the event to parent control to get the next page records
  public onScroll(event: any) {
    const element = this.scrollContainer.nativeElement;
    const atBottom = element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight;
    if (atBottom) {
      this.currentPageIndex += 1;
      let localDataSourceTotalRecord = 0;
      if (this.localDataSource.length > 0) {
        localDataSourceTotalRecord = this.localDataSource.length;
      }
      if (localDataSourceTotalRecord < this.totalRecord) {
        this.pageChange.emit(this.currentPageIndex);
      }
    }
  }

  public onPageChanged(pageNumber: number) {
    if (pageNumber) {
      this.pageChange.emit(pageNumber);
      this.resetCheckboxState();
    }
  }

  public onChangeHeaderCheckbox(headerRow: boolean) {
    this.selectedRows = [];
    this.addRemoveCheckClass(false);
    this.selectedItems.emit({selectedItems: this.mapHeaderCheckBox(headerRow)});
  }

  public onItemCheck(item: any) {
    if (item) {
      if (item.isSelected) {
        this.selectedRows.push(item.id);
        this.isSelected = true;
        if (this.selectedRows.length === this.localDataSource.length) {
          this.addRemoveCheckClass(false);
        } else {
          this.addRemoveCheckClass(true);
        }
      } else {
        this.deleteUnCheckItem(item);
        if (this.selectedRows.length > 0) {
          this.addRemoveCheckClass(true);
          this.isSelected = true;
        } else {
          this.addRemoveCheckClass(false);
          this.isSelected = false;
        }
      }
      this.selectedItems.emit({selectedItems: this.selectedRows});
    }
  }

  public resetCheckboxState() {
    this.selectedRows = [];
    this.isSelected = false;
    this.selectedItems.emit({selectedItems: this.mapHeaderCheckBox(false)});
  }

  ngOnDestroy() {
    this.cleanComponent();
  }

  /** Helper Methods */

  private cleanComponent() {

  }

  private mapHeaderCheckBox(isSelectedValue: boolean) {
    _.map(this.dataSourceInput, (item) => {
      item.isSelected = isSelectedValue;
    });
    _.forEach(this.dataSourceInput, (notificationItem: any) => {
      if (notificationItem && notificationItem.isSelected) {
        this.selectedRows.push(notificationItem.id);
      } else {
        this.selectedRows = [];
      }
    });
    return this.selectedRows;
  }

  private deleteUnCheckItem(rowItem: any) {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const index = this.selectedRows.findIndex((id: any) => {
        return id === rowItem.id;
      });
      if (index !== -1) {
        this.selectedRows.splice(index, 1);
      }
    }
  }

  private addRemoveCheckClass(isAdd: boolean) {
    if (isAdd) {
      this.renderer2.addClass(
        this.checkBoxLabel.nativeElement,
        'minus-bg'
      );
    } else {
      this.renderer2.removeClass(
        this.checkBoxLabel.nativeElement,
        'minus-bg'
      );
    }
  }
}
