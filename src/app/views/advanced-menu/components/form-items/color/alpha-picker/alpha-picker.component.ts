import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-alpha-picker',
    templateUrl: './alpha-picker.component.html',
    styleUrls: ['./alpha-picker.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class AlphaPickerComponent implements OnInit {
    @Input() label: string;
    @Input() color: string;
    alphaStr: string = '100%';
    @Output() colorEvent: EventEmitter < string > = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    updateAlpha(colorEvent): void {
        this.alphaStr = `${colorEvent.color.rgb.a * 100}%`; // calculate the left offset to keep slider persistent on color change
        this.colorEvent.emit(colorEvent.color.rgb.a);
    }
}