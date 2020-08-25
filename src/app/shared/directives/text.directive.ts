import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive( {
    selector : 'test-dir'
})

export class TestDirective {

    @Input('test-dir') test: boolean; 

    constructor(templatRef: ElementRef, containerRef: ViewContainerRef) {
      if (!this.test) {
        containerRef.createEmbeddedView
      }
    }
}