import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMenuItemDisabled]'
})
export class MenuItemDisabledDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style['cursor'] = 'no-drop';
}

}
