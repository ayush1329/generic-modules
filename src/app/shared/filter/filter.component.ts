import {
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ElementRef, OnDestroy
} from '@angular/core';
import {
  FilterDirective, FilterMultiSelectDirective, FilterRangeDirective, FilterRangeInputDirective,
  FilterSingleSelectDirective
} from './filter.directive';
import {
  FilterModel, FilterValueModel, RangeFilterModel,
  RangeSliderContextModel, SelectFilterModel
} from './filter.model';
import {FilterType} from './filter-type';
import {FilterService} from './filter.service';
import {FilterConstant} from './filter-constants';

@Component({
  selector: 'app-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy {

  /* Public Variables */
  public showFilter = true;
  public activeIndex = 0;
  public searchText: string;
  public localFilterConfig: Array<FilterModel> = [];
  public filters = [];

  /* Input Decorators */
  @Input() showRangeInputs = true;
  @Input() closePopupOnOutsideClick = false;
  @Input() numberOfRecords = 10;

  /* Output Decorators */
  @Output() public appliedFilters: EventEmitter<any> = new EventEmitter();

  /* Decorators */
  @ContentChild(FilterDirective, {read: TemplateRef, static: true}) templateOption: FilterDirective;
  @ContentChild(FilterMultiSelectDirective, {
    read: TemplateRef,
    static: true
  }) multiSelectTemplate: FilterMultiSelectDirective;
  @ContentChild(FilterSingleSelectDirective, {
    read: TemplateRef,
    static: true
  }) singleSelectTemplate: FilterSingleSelectDirective;
  @ContentChild(FilterRangeDirective, {read: TemplateRef, static: true}) rangeTemplate: FilterRangeDirective;
  @ContentChild(FilterRangeInputDirective, {
    read: TemplateRef,
    static: true
  }) rangeInputTemplate: FilterRangeInputDirective;

  /* Private Variables */
  private currentPageIndex = 0;
  private currentNumberOfRecords: number;
  private config: Array<FilterModel> = [];
  private isAllFilterClear: boolean;

  constructor(private elementRef: ElementRef, private filterService: FilterService) {
  }

  /* Accessors */
  get configData(): any {
    return this.config;
  }

  @Input('config')
  set configData(configData: any) {
    this.config = configData;
    this.setLocalConfigData(this.config);
    if (this.config) {
      this.filterService.initialFilters = JSON.parse(JSON.stringify(this.config));
    }
    this.setInitialSelectedFilters();
  }

  set numberOfRecordsToShow(numberOfRecords: number) {
    this.filterService.numberOfRecords = numberOfRecords;
  }

  get filterType(): any {
    return FilterType;
  }

  get isFilterSelected(): boolean {
    return this.filterService.isFilterSelected;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.closePopupOnOutsideClick) {
      this.maintainFilterState();
    }
  }

  ngOnInit() {
    this.numberOfRecordsToShow = this.numberOfRecords;
  }

  public activeTab(index: number) {
    this.activeIndex = index;
    this.searchText = FilterConstant.FILTER_EMPTY;
  }

  /* Events Handling */

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter === false) {
      this.maintainFilterState();
    }
  }

  onSelectListItem(filterConfig: FilterModel, dataItem?: FilterValueModel) {
    if (filterConfig) {
      this.filterService.isFilterSelected = true;
      this.bindSelectFilters(filterConfig, dataItem);
    }
  }

  onChangeSliderValue(filterConfig: FilterModel, contextValue: RangeSliderContextModel) {
    if (contextValue && filterConfig) {
      this.filterService.isFilterSelected = true;
      this.mapRangeFilter(filterConfig, contextValue);
    }
  }

  onApplyFilters() {
    this.appliedFilters.emit({filters: this.filters});
    // this.showFilter = false;
    if (this.filterService.isFilterSelected) {
      this.filterService.initialFilters = [];
      this.filterService.initialFilters = JSON.parse(JSON.stringify(this.localFilterConfig));
    }
    this.filterService.isFilterSelected = false;
    this.activeIndex = 0;
    this.searchText = FilterConstant.FILTER_EMPTY;
  }

  onClearAllFilters() {
    if (this.config && this.config.length > 0) {
      this.isAllFilterClear = true;
      this.filterService.isFilterSelected = true;
      this.clearAllSelectedFilters(this.localFilterConfig);
      this.clearAllSelectedFilters(this.config);
      this.filters = [];
    }
  }

  onChangeRangeInput(rangeItem: FilterModel, event: any) {
    if (event.repeat) {
      event.preventDefault();
    }
    // event.keyCode is used to check weather the pressed key is of number key type. For validation purpose
    if ((rangeItem && event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8
      || event.keyCode === 190) {
      rangeItem.selectedMinValue = rangeItem.minValue ? rangeItem.minValue : rangeItem.minValue = 0;
      rangeItem.selectedMaxValue = rangeItem.maxValue ? rangeItem.maxValue : rangeItem.maxValue = rangeItem.minValue;
      this.filterService.isFilterSelected = true;
      if (!this.filters || this.filters.length < 1 || !this.checkIsExistingFilter(rangeItem)) {
        const rangeFilter = new RangeFilterModel(
          rangeItem.id, rangeItem.columnName, rangeItem.displayName, rangeItem.type, rangeItem.minValue, rangeItem.maxValue,
          rangeItem.minValue, rangeItem.maxValue, rangeItem.active, rangeItem.searchEnabled, rangeItem.displayOrder, rangeItem.widgetAlias,
          rangeItem.dataType, rangeItem.lookups
        );
        this.filters.push(rangeFilter);
      } else {
        this.filters.forEach((filter: RangeFilterModel) => {
          if (filter.id === rangeItem.id) {
            filter.minValue = rangeItem.minValue;
            filter.maxValue = rangeItem.maxValue;
            filter.selectedMinValue = rangeItem.minValue;
            filter.selectedMaxValue = rangeItem.maxValue;
          }
        });
      }
    }
  }

  onLoadElement(filterData: FilterModel, event: any) {
    if (filterData) {
      event.stopPropagation();
      this.setLocalConfigData(this.configData, filterData);
    }
  }

  onSearch(event: any) {
    if (event) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.filters = null;
    this.config = null;
    this.localFilterConfig = null;
    this.appliedFilters = null;
    this.filterService = null;
  }

  /* Helper Methods */

  private bindSelectFilters(filterConfig: FilterModel, dataItem?: FilterValueModel) {
    if (!this.filters || this.filters.length < 1 || !this.checkIsExistingFilter(filterConfig)) {
      const values = this.mapSelectFilter(filterConfig, dataItem);
      const mapSelectFilter = new SelectFilterModel(
        filterConfig.id, filterConfig.columnName, filterConfig.displayName, filterConfig.type, values, filterConfig.displayOrder,
        filterConfig.active, filterConfig.searchEnabled, filterConfig.widgetAlias,
        filterConfig.dataType, filterConfig.lookups);
      this.filters.push(mapSelectFilter);
      if (mapSelectFilter.values.length < 1) {
        this.removeFilterItem();
      }
    } else {
      this.filters.forEach((filter: SelectFilterModel) => {
        if (filter.id === filterConfig.id) {
          filter.values = [];
          filter.values = this.mapSelectFilter(filterConfig, dataItem);
          if (filter.values.length < 1) {
            this.removeFilterItem();
          }
        }
      });
    }
  }

  private mapSelectFilter(filterConfig: FilterModel, dataItem: FilterValueModel) {
    if (filterConfig && filterConfig.values && filterConfig.values.length > 0) {
      const values = [];
      if(filterConfig.allFilterValues && filterConfig.allFilterValues.length > 0) {
        filterConfig.allFilterValues.forEach(configData => {
          if (filterConfig.type === FilterType.SingleSelect) {
            if (dataItem) {
              configData.selected = configData.id === dataItem.id && dataItem.selected;
            }
          }
          if (configData.selected === true) {
            const attributeData = new FilterValueModel(configData.id, configData.value, configData.displayName, configData.selected);
            values.push(configData);
          }
        });
      }
      return values;
    }
  }

  private mapRangeFilter(filterConfig: FilterModel, contextValue: RangeSliderContextModel) {
    filterConfig.selectedMinValue = contextValue.value;
    filterConfig.selectedMaxValue = contextValue.highValue;
    if (!this.filters || this.filters.length < 1 || !this.checkIsExistingFilter(filterConfig)) {
      const rangeFilter = new RangeFilterModel(
        filterConfig.id, filterConfig.columnName, filterConfig.displayName, filterConfig.type, contextValue.value, contextValue.highValue,
        contextValue.value, contextValue.highValue, filterConfig.active, filterConfig.searchEnabled, filterConfig.displayOrder,
        null, filterConfig.dataType,
      );
      this.filters.push(rangeFilter);
    } else {
      this.filters.forEach((filter: RangeFilterModel) => {
        if (filter.id === filterConfig.id) {
          filter.minValue = contextValue.value;
          filter.maxValue = contextValue.highValue;
          filter.selectedMinValue = filter.minValue;
          filter.selectedMaxValue = filter.maxValue;
        }
      });
    }
  }

  private removeFilterItem() {
    if (this.filters && this.filters.length > 0) {
      this.filters = this.filters.filter((filter: FilterModel) => {
        return filter.type === FilterType.SingleSelect || filter.type === FilterType.MultiSelect
          ? filter.values.length > 0 : filter;
      });
    }
  }

  private checkIsExistingFilter(filterConfig: FilterModel) {
    return this.filters && this.filters.length > 0 ? this.filters.find((filterItem: FilterModel) => {
      return filterItem.id === filterConfig.id;
    }) : false;
  }

  private setLocalConfigData(configData, filterItem?: FilterModel) {
    if (configData && configData.length > 0) {
      this.localFilterConfig = [];
      configData.forEach(configItem => {
        if (configItem.active) {
          configItem.currentPageIndex = configItem.currentPageIndex ? configItem.currentPageIndex += 1 : 1;
          if (filterItem && configItem.id === filterItem.id) {
            configItem.numberOfRecords = configItem.currentPageIndex * this.numberOfRecords;
          } else {
            configItem.numberOfRecords = configItem.currentNumberOfRecords ? configItem.currentNumberOfRecords :
              this.numberOfRecords;
          }
          this.mapLocalConfigData(configItem);
        }
      });
    }
  }

  private mapLocalConfigData(configItem) {
    configItem.values = configItem.values && configItem.values.length > 0 ?
      configItem.values : configItem.defaultValue && configItem.defaultValue.length > 0 ?
        configItem.defaultValue : [];
    const values = [];
    for (let i = 0; i < configItem.numberOfRecords; i++) {
      if (configItem.values[i]) {
        values.push(configItem.values[i]);
      }
    }
    const localConfig = new FilterModel(
      configItem.id, configItem.columnName, configItem.displayName, configItem.type, configItem.displayOrder,
      configItem.active, configItem.searchEnabled, configItem.minValue, configItem.maxValue,
      configItem.selectedMinValue, configItem.selectedMaxValue, configItem.numberOfRecords, configItem.currentPageIndex,
      values, configItem.values, configItem.widgetAlias, configItem.dataType, configItem.lookups, configItem.sliderOptions
    );
    this.localFilterConfig.push(localConfig);
  }

  private maintainFilterState() {
    this.activeIndex = 0;
    this.searchText = FilterConstant.FILTER_EMPTY;
    this.showFilter = false;
    if (this.filterService.isFilterSelected) {
      this.currentNumberOfRecords = 10;
      this.resetToInitialStateFilter();
    }
  }

  private resetToInitialStateFilter() {
    this.filters = [];
    this.filterService.isFilterSelected = false;
    this.localFilterConfig = [];
    this.localFilterConfig = JSON.parse(JSON.stringify(this.filterService.resetState()));
    this.currentPageIndex = 0;
    this.setInitialSelectedFilters();
  }

  private setInitialSelectedFilters() {
    if (this.filterService.initialFilters && this.filterService.initialFilters.length > 0) {
      this.filterService.initialFilters.forEach(localFilter => {
        if (localFilter.type === FilterType.MultiSelect || localFilter.type === FilterType.SingleSelect) {
          if (localFilter && localFilter.values && localFilter.values.length > 0) {
            localFilter.values.forEach((value: FilterValueModel) => {
              if (localFilter.type === FilterType.MultiSelect) {
                this.bindSelectFilters(localFilter, value);
              } else if (localFilter.type === FilterType.SingleSelect && value.selected === true) {
                this.bindSelectFilters(localFilter, value);
              }
            });
          }
        } else if (localFilter.type === FilterType.Range) {
          if (localFilter.selectedMinValue || localFilter.selectedMaxValue) {
            const rangeFilter = new RangeFilterModel(
              localFilter.id, localFilter.columnName, localFilter.displayName, localFilter.type, localFilter.minValue, localFilter.maxValue,
              localFilter.minValue, localFilter.maxValue, localFilter.active, localFilter.searchEnabled, localFilter.displayOrder,
            );
            this.filters.push(rangeFilter);
          }
        }
      });
    }
  }

  private clearAllSelectedFilters(configData: Array<FilterModel>) {
    configData.forEach((configItem: FilterModel) => {
      this.filters.forEach((filterItem: FilterModel) => {
        if (configItem.id === filterItem.id) {
          if (configItem.type === FilterType.MultiSelect || configItem.type === FilterType.SingleSelect) {
            configItem.values.forEach((filterConfigItem: FilterValueModel) => {
              filterConfigItem.selected = false;
            });
          } else if (configItem.type === FilterType.Range) {
            configItem.minValue = configItem.sliderOptions.sliderOptions.floor;
            configItem.maxValue = configItem.sliderOptions.sliderOptions.ceil;
          }
        }
      });
    });
  }
}


// TODO : Need to refactor the method mapRangeFilter and onChangeRangeInput as currently both are working same.
