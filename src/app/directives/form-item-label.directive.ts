import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormItemLabel]'
})
export class FormItemLabelDirective {

    constructor(el: ElementRef) {
        el.nativeElement.style.color = "var(--primary-border)";
        el.nativeElement.style.fontSize = "12px";
        el.nativeElement.style['padding-bottom'] = '2px';
    }

}
