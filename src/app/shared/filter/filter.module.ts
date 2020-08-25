import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import {
  FilterDirective, FilterMultiSelectDirective, FilterRangeDirective, FilterRangeInputDirective,
  FilterSingleSelectDirective
} from './filter.directive';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { FilterService } from './filter.service';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [FilterComponent, FilterDirective, SearchFilterPipe,
    FilterMultiSelectDirective, FilterSingleSelectDirective, FilterRangeInputDirective, FilterRangeDirective],
  imports: [CommonModule, FormsModule, Ng5SliderModule],
  exports: [FilterComponent, FilterDirective, FilterMultiSelectDirective, FilterSingleSelectDirective, FilterRangeInputDirective,
    FilterRangeDirective],
  providers: [FilterService]
})

export class FilterModule {

}
