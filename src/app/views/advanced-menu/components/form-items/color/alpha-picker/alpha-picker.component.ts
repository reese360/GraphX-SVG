import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-alpha-picker',
    templateUrl: './alpha-picker.component.html',
    styleUrls: ['./alpha-picker.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AlphaPickerComponent implements OnInit {
    // alphaStr: string = '100%';
    @Input() alpha: string;
    @Input() label: string;
    @Input() color: string;
    @Output() colorEvent: EventEmitter < string > = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    updateAlpha(colorEvent): void {
        this.colorEvent.emit(colorEvent.color.rgb.a);
    }
}