import { Component, OnInit, ViewChild } from "@angular/core";
import { FilterComponent } from 'src/app/shared/filter/filter.component';

@Component({
    selector: 'filter',
    templateUrl: 'app-filter.component.html',
    styleUrls: ['app-filter.component.scss']
})

export class AppFilterComponent implements OnInit {

    /* Public variables */
    public config: any = [
        {
            "id": 1,
            "columnName": "invoiceItemId",
            "type": "MULTI_SELECT",
            "active": true,
            "displayName": "Invoice Items",
            "displayOrder": 10,
            "searchEnabled": true,
            "dataType": "bigint",
            "lookups": { "key": "invoice_items" },
            "widgetAlias": null,
            "values": [
                {
                    "id": "490042",
                    "name": "WHOLESALE 8YY TRAFFIC",
                    "subGroupDisplayName": null
                },
                {
                    "id": "490043",
                    "name": "WHOLESALE",
                    "subGroupDisplayName": null
                },
                {
                    "id": "490044",
                    "name": "TRAFFIC",
                    "subGroupDisplayName": null
                }
            ]
        },
        {
            "id": 2,
            "columnName": "newRate",
            "type": "RANGE",
            "active": true,
            "displayName": "Rates",
            "displayOrder": 20,
            "searchEnabled": false,
            "dataType": "double",
            "lookups": null,
            "widgetAlias": null,
            "roundingKey": "decimalPlacesForRate",
            "minValue": 0.57,
            "maxValue": 2.57
        },
        {
            "id": 3,
            "columnName": "existingRate",
            "type": "RANGE",
            "active": true,
            "displayName": "Existing Rates",
            "displayOrder": 30,
            "searchEnabled": false,
            "dataType": "double",
            "lookups": null,
            "widgetAlias": null,
            "roundingKey": "decimalPlacesForRate",
            "minValue": 0.001,
            "maxValue": 1
        },
        {
            "id": 4,
            "columnName": "pulseRate",
            "type": "MULTI_SELECT",
            "active": true,
            "displayName": "Pulse Rates",
            "displayOrder": 40,
            "searchEnabled": false,
            "dataType": "varchar",
            "lookups": null,
            "widgetAlias": null,
            "values": [
                {
                    "id": "1-1",
                    "name": "1-1"
                }
            ]
        },
        {
            "id": 5,
            "columnName": "partnerRate",
            "type": "RANGE",
            "active": true,
            "displayName": "ACPM",
            "displayOrder": 50,
            "searchEnabled": false,
            "dataType": "double",
            "lookups": null,
            "widgetAlias": null,
            "roundingKey": "decimalPlacesForRate",
            "minValue": 0.0016999999999999997,
            "maxValue": 0.0016999999999999997
        }
    ];


    @ViewChild('filterPopup', { static: true }) filterPopup: FilterComponent;

    constructor() { }

    ngOnInit() {
        this.config.forEach((config) => {
            if (config.type === 'RANGE') {
                config.sliderOptions = {
                    sliderOptions: {
                        floor: parseFloat(config.minValue),
                        ceil: parseFloat(config.maxValue),
                        step: 0.01,
                    },
                    showRangeInputTextBox: true,
                };
            }
        });
        console.log(this.config);
    }

    onOpenFilter(event: any) {
        if (event) {
            event.stopPropagation();
            this.filterPopup.toggleFilter();
        }
    }

    onApplyFilters(appliedFilters: any) {
        console.log(appliedFilters);
    }
}

