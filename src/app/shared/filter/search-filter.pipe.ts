import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'search_filter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any, allItems: any, searchText: string = '', filter: any = null): any {
    if (!searchText || (searchText && searchText.length <= 0)) {
      return items;
    }
    searchText = searchText.toLowerCase();
    if (!Array.isArray(items)) {
      return items;
    }
    let filterKeys: any;
    if (filter != null && filter.length > 0) {
      filterKeys = filter;
    } else {
      filterKeys = Object.keys(items[0]);
    }

    if (Array.isArray(allItems)) {
      const data = allItems.filter(item => {
        return filterKeys.some((keyName) => {
          if (item[keyName] != null && keyName === 'name') {
            if (item[keyName].toString().toLowerCase().includes(searchText)) {
              return true;
            }
          }
        });
      });
      return data && data.length > 0 ? data : ['-1'];
    }
  }
}
