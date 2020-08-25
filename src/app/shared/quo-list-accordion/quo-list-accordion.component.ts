import {Component, OnDestroy, OnInit, ViewChild, Input, TemplateRef} from '@angular/core';

declare var $:any;

@Component({
    selector: 'quo-list-accordion',
    templateUrl : './quo-list-accordion.component.html',
})

export class QuoListAccordionComponent implements OnInit , OnDestroy{

  /* Public Variables */
  public isExpand: boolean = true;

  /*Input Variables */
  @Input() title: string;
  @Input() treeData: any;
  @Input() headerTemplate: TemplateRef<any>;
  @Input() showArrow : boolean = true;

  /** Accessors */

  @Input('isExpand')
  set dataSource(isExpand: boolean) {
      this.isExpand = isExpand;
  }

  constructor() {

  }

  ngOnInit() {

  }

  public toggleIcon(e: any) {
      $(e.currentTarget).find('.cat-header').toggleClass('fa-chevron-right fa-chevron-down');
  }
  
  ngOnDestroy() {

  }
    
}