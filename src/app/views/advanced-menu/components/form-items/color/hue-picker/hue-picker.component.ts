import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-hue-picker',
	templateUrl: './hue-picker.component.html',
	styleUrls: ['./hue-picker.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class HuePickerComponent implements OnInit {
	@Input() label: string;
	@Input() color: string = '#000';
	@Output() colorEvent: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	updateHue(colorEvent: { color: { hex: string } }): void {
		this.color = colorEvent.color.hex;
		this.colorEvent.emit(this.color);
	}
}
