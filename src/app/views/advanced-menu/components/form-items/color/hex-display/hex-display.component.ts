import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-hex-display',
	templateUrl: './hex-display.component.html',
	styleUrls: ['./hex-display.component.css'],
})
export class HexDisplayComponent implements OnInit {
	@Input() label: string;
	@Input() color: string;
	@Output() colorEvent: EventEmitter<string> = new EventEmitter();
	constructor() {}

	ngOnInit(): void {}

	updateInputValue(value): void {
		if (value === this.color) return; // return if no change
		// check if value is 3 or 6 digit VALID hex color
		if (/^#[0-9A-F]{6}$/i.test(value)) {
			// 6 character hex value
			this.color = value;
			this.colorEvent.emit(value);
		} else {
			// reset invalid color to black
			const tempColor = '#000000';
			this.color = tempColor;
		}
	}
}
