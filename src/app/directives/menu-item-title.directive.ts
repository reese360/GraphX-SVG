import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appMenuItemTitle]'
})
export class MenuItemTitleDirective {

    constructor(el: ElementRef) {
        el.nativeElement.style.color = "var(--graphx-dark-gray)";
        el.nativeElement.style.fontSize = "30px";
    }

}