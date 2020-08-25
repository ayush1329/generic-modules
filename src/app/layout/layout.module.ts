import { NgModule } from "@angular/core";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutingModule } from "./layout.routing.module";
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [LayoutComponent],
    imports : [CommonModule,LayoutRoutingModule],
    exports : [],
    providers : []
})

export class LayoutModule {
    
}