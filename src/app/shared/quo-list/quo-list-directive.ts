import { Directive, TemplateRef } from '@angular/core';

@Directive({selector : '[quo-list-item-select]'})
export class QuoListItemSelectDirective {
    constructor(public template: TemplateRef<any>) {
    }
}
