import { Directive, TemplateRef } from '@angular/core';

@Directive({selector : '[appFilterTemplate]'})
export class FilterDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector : '[appMultiSelectTemplate]'})
export class FilterMultiSelectDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector : '[appSingleSelectTemplate]'})
export class FilterSingleSelectDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector : '[appRangeTemplate]'})
export class FilterRangeDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({selector : '[appRangeInputTemplate]'})
export class FilterRangeInputDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

