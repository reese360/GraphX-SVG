import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-saturation-picker',
	templateUrl: './saturation-picker.component.html',
	styleUrls: ['./saturation-picker.component.css'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class SaturationPickerComponent implements OnInit {
	@Input() label: string;
	@Input() color: string;
	@Output() colorEvent: EventEmitter<string> = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	updateSaturation(colorEvent: { color: { hex: string } }): void {
		this.color = colorEvent.color.hex;
		this.colorEvent.emit(this.color);
	}
}
