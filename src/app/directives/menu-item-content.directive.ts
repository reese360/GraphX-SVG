import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appMenuItemContent]',
})
export class MenuItemContentDirective {
	constructor(el: ElementRef) {
		el.nativeElement.style['min-width'] = '280px';
		el.nativeElement.style['padding-top'] = '40px';
		el.nativeElement.style['grid-template-rows'] = '1fr';
		el.nativeElement.style['grid-template-columns'] = '1fr auto 1fr';
		el.nativeElement.style['grid-row-gap'] = '20px';
		el.nativeElement.style['grid-column-gap'] = '5px';
		// el.nativeElement.style['justify-content'] = 'center';
	}
}
