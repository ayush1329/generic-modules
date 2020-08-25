import {Injectable} from '@angular/core';
import {FilterModel} from './filter.model';

@Injectable()
export class FilterService {

  /* Public Variables */
  public isFilterSelected: boolean;
  public initialFilters: any;
  public numberOfRecords: number;

  constructor() {
  }

  public resetState() {
    if (this.initialFilters && this.initialFilters.length > 0) {
      const localFilterConfig = [];
      this.initialFilters.forEach(configItem => {
        configItem.values = configItem.values && configItem.values.length > 0 ?
          configItem.values : configItem.defaultValue && configItem.defaultValue.length > 0 ?
            configItem.defaultValue : [];
        const values = [];
        for (let i = 0; i < this.numberOfRecords; i++) {
          if (configItem.values[i]) {
            values.push(configItem.values[i]);
          }
        }
        const localConfig = new FilterModel(
          configItem.id, configItem.columnName, configItem.displayName, configItem.type, configItem.displayOrder,
          configItem.active, configItem.searchEnabled, configItem.minValue, configItem.maxValue,
          configItem.selectedMinValue, configItem.selectedMaxValue, configItem.numberOfRecords, configItem.currentPageIndex, values,
          configItem.values, configItem.widgetAlias, configItem.dataType, configItem.lookups, configItem.sliderOptions
        );
        localFilterConfig.push(localConfig);
      });
      return localFilterConfig;
    }
  }
}
