import {Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { QuoListComponent } from 'src/app/shared/quo-list/quo-list.component';
import { HeaderItem } from 'src/app/shared/quo-list/quo-list.model';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
    selector: 'table-list-accordion',
    templateUrl : './table-list-accordion.component.html',
    styleUrls : ['./table-list-accordion.component.scss']
})

export class TableListAccordionComponent implements OnInit , OnDestroy{

    /** public variables */
    public listHeaders: any;
    public listData: any;
    public isExpand = false;
    public accData: any;
    public accordionHeight: number;
    public listHeight: number;
    public textStr: string;

    /** child decorators */
    @ViewChild('list', { static: false }) list : QuoListComponent;
    

    constructor(private cdRef: ChangeDetectorRef, private navigationSvc: NavigationService) {
        this.listHeaders = [
            { title: "Test Header 1", sortable: true, widthClass: "text-left",width: "150",sortBy: "col1",  id: "1", sortClassName : 'fa fa-long-arrow-up', sortOrder : 'asc' },
            { title: "Test Header 2", sortable: true, widthClass: "text-left", width: "160", sortBy: "col2",  id: "2" , sortClassName : 'fa fa-long-arrow-up' , sortOrder : 'asc'},
            { title: "Test Header 3", sortable: true, widthClass: "text-left",width: "160",sortBy: "col3", id: "3",sortClassName : 'fa fa-long-arrow-up',sortOrder : 'asc'  },
            { title: "Test Header 4",  sortable: true, widthClass: "text-left",  width: "120",  sortBy: "col4",  id: "4",sortClassName : 'fa fa-long-arrow-up' ,sortOrder : 'asc' },
            { title: "Test Header 5", sortable: true, widthClass: "text-left",  width: "200", sortBy: "col5", id: "5",sortClassName : 'fa fa-long-arrow-up' , sortOrder : 'asc' },
            { title: "Test Header 5",sortable: true, widthClass: "text-left", width: "120", sortBy: "col6",id: "6",sortClassName : 'fa fa-long-arrow-up' ,sortOrder : 'asc' },
          ];

        this.listData = [
            {
                id : 1,
                col1 : 'Ayush',
                col2 : 'Ayush',
                col3 : 'Ayush35',
                col4 : 'Ayush',
                col5 : 'Ayush35',
                col6 : 'Ayush',
            },
            {
               id : 2,
               col1 : 'Ayush000',
               col2 : 'Ayush',
               col3 : 'Ayush',
               col4 : 'Ayush34',
               col5 : 'Ayush',
               col6 : 'Ayush43',
           },
           {
               id : 3,
               col1 : 'Ayush1242',
               col2 : 'Ayush',
               col3 : 'Ayush64',
               col4 : 'Ayush7987',
               col5 : 'Ayush',
               col6 : 'Ayush79',
           },
           {
               id : 4,
               col1 : 'Ayush346',
               col2 : 'Ayush',
               col3 : 'Ayush634',
               col4 : 'Ayush',
               col5 : 'Ayush36',
               col6 : 'Ayush63',
           },
           {
               id : 5,
               col1 : 'Ayush345',
               col2 : 'Ayush',
               col3 : 'Ayush634',
               col4 : 'Ayush',
               col5 : 'Ayush4643',
               col6 : 'Ayush',
           },
           {
               id : 6,
               col1 : 'Ayush7658',
               col2 : 'Ayush346',
               col3 : 'Ayush',
               col4 : 'Ayush463',
               col5 : 'Ayush',
               col6 : 'Ayush',
           },
           {
               id : 7,
               col1 : 'Ayushsdf',
               col2 : 'Ayush',
               col3 : 'Ayush34',
               col4 : 'Ayush364',
               col5 : 'Ayush',
               col6 : 'Ayush',
           },
           {
               id : 8,
               col1 : 'Ayush',
               col2 : 'Ayush',
               col3 : 'Ayushsdf',
               col4 : 'Ayush',
               col5 : 'Ayush',
               col6 : 'Ayush677',
           },
           {
               id : 9,
               col1 : 'Ayush',
               col2 : 'Ayush56',
               col3 : 'Ayush',
               col4 : 'Ayush677',
               col5 : 'Ayush',
               col6 : 'Ayush134',
           },
           {
               id : 10,
               col1 : 'Ayush243',
               col2 : 'Ayush324',
               col3 : 'Ayush',
               col4 : 'Ayush345',
               col5 : 'Ayush',
               col6 : 'Ayush57',
           }
        ];

        this.accData = [
            {
               id : 1,
               level2 : [],
               listData : this.listData,
               listHeaders : this.listHeaders
            },
            {
                id : 2,
                level2 : [],
                listData : this.listData,
                listHeaders : this.listHeaders
            },
            {
                id : 3,
                level2 : [],
                listData : this.listData,
                listHeaders : this.listHeaders
            },
            {
                id : 4,
                level2 : [],
                listData : this.listData,
                listHeaders : this.listHeaders
            },
            
        ]
    }

    ngOnInit() {

    }

    ngAfterViewChecked() {
       const windowHeightInitial = window.innerHeight - 90;
       this.listHeight = 200;
       this.accordionHeight = windowHeightInitial;
       this.cdRef.detectChanges();
     }

    onPageChange(event : any) {
      console.log(event);
    }

    onSort(header : HeaderItem) {
       console.log(header);
    }

    clearData() {
       this.clearList();
    }

    ngOnDestroy() {
         this.cleanUp();   
    }

    /** Helper Methods */

    private cleanUp(){
        delete this.listData;
        delete this.listHeaders;
        delete this.accData;
    }

    private clearList() {
        this.list.clear();
    }
    
}