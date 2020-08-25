import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table-list/table-list.component';
import { ListRoutingModule } from './list.routing.module';
import { QuoListModule } from '../shared/quo-list/quo-list.module';
import { TableListAccordionComponent } from './table-list-accordion/table-list-accordion.component';
import { QuoListAccordionModule } from '../shared/quo-list-accordion/quo-list-accordion.module';
import { QueryBuilderQuoModule } from '../shared/query-builder/query-builder-quo.module';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { FormsModule } from '@angular/forms';
import { RuleBuilderService } from './rule-builder/rule-builder.service';
import { FilterModule } from '../shared/filter/filter.module';
import { AppFilterComponent } from './app-filter/app-filter.component';
import { NavigationService } from '../services/navigation.service';

@NgModule({
    declarations : [TableListComponent,TableListAccordionComponent,RuleBuilderComponent, AppFilterComponent],
    imports : [CommonModule,ListRoutingModule, QuoListModule,QuoListAccordionModule, QueryBuilderQuoModule,FormsModule,
    FilterModule],
    exports : [],
    providers : [RuleBuilderService, NavigationService]
})

export class ListModule {
    
}