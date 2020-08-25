import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { TableListAccordionComponent } from './table-list-accordion/table-list-accordion.component';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { AppFilterComponent } from './app-filter/app-filter.component';

const routes: Routes = [ 
    {
        path: '', 
        component: TableListComponent,
    },
    {
        path: 'table-list', 
        component: TableListComponent
    },
    {
        path: 'table-list-accordion', 
        component: TableListAccordionComponent
    },
    {
        path: 'rule-builder', 
        component: RuleBuilderComponent
    },
    {
        path: 'app-filter', 
        component: AppFilterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }