import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { QueryBuilderConfig } from '../../shared/query-builder/query-builder-quo.interfaces';
import { QueryBuilderQuoComponent } from 'src/app/shared/query-builder/query-builder-quo.component';
import { RuleBuilderService } from './rule-builder.service';

@Component({
    selector : 'rule-builder',
    templateUrl : './rule-builder.component.html',
    styleUrls : ['./rule-builder.component.scss']
})

export class RuleBuilderComponent implements OnInit, OnDestroy {
    /** Public Variables */

    public query = {
        condition: 'and',
        rules: [
          {field: 'age', operator: '<=', value: 'Bob'},
          {field: 'gender', operator: '=', value: 'm'},
          {field: 'occupation', operator: '=', value: 'p'}
        ]
      };
      
    public config: QueryBuilderConfig = {
        fields: {
          age: {name: 'Age', type: 'number'},
          gender: {
            name: 'Gender',
            type: 'category',
            options: [
              {name: 'Male', value: 'm'},
              {name: 'Female', value: 'f'}
            ]
          },
          occupation: {
            name: 'Occupation',
            type: 'category',
            options: [
              {name: 'Private', value: 'p'},
              {name: 'Goverment', value: 'g'}
            ]
          },
          username: {name: 'Name', type: 'string'},
        }
      }


      /** ViewChild Decorator */
    @ViewChild('queryBuilder', {static : false}) queryBuilder : QueryBuilderQuoComponent;

    constructor(private ruleBuilderSvc : RuleBuilderService){
       
    }

    ngOnInit(){
        this.getRuleBuilderData();
    }

    private getRuleBuilderData() {
        let ruleBuilderData  = this.ruleBuilderSvc.getRuleBuilder();
        console.log(this.config);
        console.log(ruleBuilderData.filters);
    }
 
    ngOnDestroy() {

    }
}