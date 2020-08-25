import {Options} from 'ng5-slider';

export class FilterConfigModel {
  public id: number;
  public columnName: string;
  public displayName: string;
  public type: string;
  public displayOrder: number;
  public active: boolean;
  public defaultValue?: Array<FilterValueModel>;
  public searchEnabled: boolean;
  public selected?: boolean;
  public lookups: any;
  public dataType: string;
  public widgetAlias: any;

  constructor(id: number, columnName: string, displayName: string, type: string, displayOrder: number, isActive: boolean,
              searchEnabled: boolean, widgetAlias?: any, dataType?: string, lookups?: any) {
    this.id = id;
    this.columnName = columnName;
    this.displayName = displayName;
    this.type = type;
    this.displayOrder = displayOrder;
    this.active = isActive;
    this.searchEnabled = searchEnabled;
    this.lookups = lookups;
    this.dataType = dataType;
    this.widgetAlias = widgetAlias;
  }
}


export class RangeFilterModel extends FilterConfigModel {
  public minValue: number;
  public maxValue: number;
  public selectedMinValue?: number;
  public selectedMaxValue?: number;

  constructor(id: number, columnName: string, displayName: string, type: string, minValue: number, maxValue: number,
              selectedMinValue: number, selectedMaxValue: number, isActive?: boolean,
              searchEnabled?: boolean, displayOrder?: number, widgetAlias?: any, dataType?: string,
              lookups?: any) {
    super(id, columnName, displayName, type, displayOrder, isActive, searchEnabled, widgetAlias, dataType, lookups);
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.selectedMinValue = selectedMinValue;
    this.selectedMaxValue = selectedMaxValue;
  }
}

export class SelectFilterModel extends FilterConfigModel {
  public values: Array<FilterValueModel>;

  constructor(id: number, columnName: string, displayName: string, type: string, values: Array<FilterValueModel>,
              displayOrder?: number, isActive?: boolean,
              searchEnabled?: boolean, widgetAlias?: any, dataType?: string,
              lookups?: any) {
    super(id, columnName, displayName, type, displayOrder, isActive, searchEnabled, widgetAlias, dataType, lookups);
    this.values = values;
  }
}

export class FilterModel {
  public id: number;
  public columnName: string;
  public displayName: string;
  public type: string;
  public displayOrder: number;
  public active: boolean;
  public defaultValue?: Array<CommonDataModel>;
  public searchEnabled: boolean;
  public selected?: boolean;
  public minValue?: number;
  public maxValue?: number;
  public selectedMinValue?: number;
  public selectedMaxValue?: number;
  public values: Array<FilterValueModel>;
  public allFilterValues: Array<FilterValueModel>;
  public numberOfRecords: number;
  public currentPageIndex = 0;
  public lookups: any;
  public dataType: string;
  public widgetAlias: any;
  public sliderOptions: RangeSliderOptionModel;

  constructor(id: number, columnName: string, displayName: string, type: string, displayOrder: number, isActive: boolean,
              searchEnabled: boolean, minValue: number, maxValue: number,
              selectedMinValue: number, selectedMaxValue: number, numberOfRecords: number, currentPageIndex:number,
              values: Array<FilterValueModel>, allFilterValues: Array<FilterValueModel>, widgetAlias?: any, dataType?: string, lookups?: any, rangeOptions?: RangeSliderOptionModel,
              defaultValue?: Array<CommonDataModel>) {
    this.id = id;
    this.columnName = columnName;
    this.displayName = displayName;
    this.type = type;
    this.displayOrder = displayOrder;
    this.active = isActive;
    this.defaultValue = defaultValue;
    this.searchEnabled = searchEnabled;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.selectedMinValue = selectedMinValue;
    this.selectedMaxValue = selectedMaxValue;
    this.values = values;
    this.allFilterValues = allFilterValues;
    this.numberOfRecords = numberOfRecords;
    this.currentPageIndex = currentPageIndex;
    this.lookups = lookups;
    this.dataType = dataType;
    this.widgetAlias = widgetAlias;
    this.sliderOptions = rangeOptions;
  }
}

export class CommonDataModel {
  public id: any;
  public value: string;

  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }
}

export class FilterValueModel extends CommonDataModel {
  public displayName: string;
  public selected?: boolean;

  constructor(id: any, value: string, displayName: string, selected: boolean) {
    super(id, value);
    this.displayName = displayName;
    this.selected = selected;
  }
}

export class RangeSliderContextModel {
  public pointerType?: number;
  public value: number;
  public highValue: number;
}

export class RangeSliderOptionModel {
  public sliderOptions: Options;
  public showRangeInputTextBox: boolean;
}
