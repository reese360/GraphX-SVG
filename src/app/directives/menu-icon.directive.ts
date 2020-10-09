import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appMenuIcon]',
})
export class MenuIconDirective {

	constructor(public el: ElementRef) {
		el.nativeElement.style.textAlign = 'center';
		el.nativeElement.style.height = '35px';
		el.nativeElement.style.lineHeight = '35px';
		el.nativeElement.style.minWidth = '35px';
		el.nativeElement.style.maxWidth = '35px';
		el.nativeElement.style.borderBottom = '1px solid var(--graphx-dark-gray)';
		el.nativeElement.style.userSelect = 'none';
		el.nativeElement.style.transition = 'color ease-in-out .25s, fill ease-in-out .15s, stroke ease-in-out .25s';
	}
}
