import { NgModule } from "@angular/core";
import { SharedComponent } from "./shared.component";
import { CommonModule } from "@angular/common";
import { SharedRoutingModule } from './shared.routing.module';
import { NavigationService } from '../services/navigation.service';
import { FormsModule } from '@angular/forms';
import { QueryBuilderQuoModule } from './query-builder/query-builder-quo.module';

@NgModule({
    declarations : [SharedComponent],
    imports : [CommonModule,SharedRoutingModule , FormsModule,QueryBuilderQuoModule],
    exports : [],
    providers : [NavigationService]
})

export class SharedModule {
    
}