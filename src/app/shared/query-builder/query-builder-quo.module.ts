import { NgModule } from "@angular/core";
import { QueryButtonGroupDirective,
    QueryEmptyWarningDirective,
    QueryEntityDirective,
    QueryFieldDirective,
    QueryInputDirective,
    QueryOperatorDirective,
    QueryRemoveButtonDirective,
    QuerySwitchGroupDirective,

} from './query-builder-quo.directive';
import { QueryBuilderQuoComponent } from './query-builder-quo.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations : [QueryButtonGroupDirective,
        QueryBuilderQuoComponent,
        QueryEmptyWarningDirective,
        QueryEntityDirective,
        QueryFieldDirective,
        QueryOperatorDirective,
        QueryRemoveButtonDirective,
        QuerySwitchGroupDirective,
        QueryInputDirective],
    imports : [CommonModule,
        FormsModule],
    exports : [QueryBuilderQuoComponent,
        QueryButtonGroupDirective,
        QueryEmptyWarningDirective,
        QueryEntityDirective,
        QueryFieldDirective,
        QueryOperatorDirective,
        QueryRemoveButtonDirective,
        QuerySwitchGroupDirective,
        QueryInputDirective
    ]
})

export class QueryBuilderQuoModule {

}