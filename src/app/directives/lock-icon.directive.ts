import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appLockIcon]'
})
export class LockIconDirective {

    constructor(el: ElementRef) {
        el.nativeElement.style['justify-content'] = 'center';
        el.nativeElement.style['line-height'] = '60px';
        el.nativeElement.style['color'] = 'var(--graphx-dark-gray)';
        el.nativeElement.style['height'] = '0px';
        el.nativeElement.style['cursor'] = 'pointer';
    }

}