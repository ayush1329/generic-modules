import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
    selector: 'shared',
    templateUrl : './shared.component.html'
})

export class SharedComponent implements OnInit , OnDestroy{

    /** Public Variables */
    public modules = new Array<any>(); 

    constructor(private navigationSvc : NavigationService) {
           this.modules = [
               {
                   id : 1,
                   title : 'Quo-List',
                   url : '/list/table-list'
               },
               {
                id : 2,
                title : 'Quo-List Accordion',
                url : '/list/table-list-accordion'
            },
            {
                id : 3,
                title : 'Rule Builder',
                url : '/list/rule-builder'
            },
            {
                id : 4,
                title : 'Filter',
                url : '/list/app-filter'
            }
           ]

         
    }

    ngOnInit() {
    } 

    public onClickRoute(url : string) {
        if(url) {
            this.navigationSvc.navigateTo(url);
        }
    } 

    ngOnDestroy() {
        delete this.modules;
    }
    
}