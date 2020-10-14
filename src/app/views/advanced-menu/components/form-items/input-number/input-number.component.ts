import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type InputNumberComponentInput = {
	label: string;
	minimum: number;
	maximum: number;
	step: number;
	showButtons?: boolean;
};

@Component({
	selector: 'app-input-number',
	templateUrl: './input-number.component.html',
	styleUrls: ['./input-number.component.css'],
})
export class InputNumberComponent implements OnInit {
	@Input() data: InputNumberComponentInput;
	@Input() currentValue: number = 1;
	@Output() updateEvent: EventEmitter<number> = new EventEmitter<number>();

	constructor() {}

	ngOnInit(): void {}

	// handle user directly inputting number
	updateInputValue(val: number): void {
		if (val > this.data.maximum) this.currentValue = this.data.maximum;
		else if (val < this.data.minimum) this.currentValue = this.data.minimum;
		else this.currentValue = Number(val);
		this.updateEvent.emit(this.currentValue);
	}

	// increments current value by step
	incrementInputValue(): void {
		if (this.currentValue + 1 < this.data.maximum) {
			this.currentValue = Math.round(((this.currentValue += this.data.step) / this.data.step) * this.data.step);
			this.updateEvent.emit(this.currentValue);
		}
	}

	// decrements current value by step
	decrementInputValue(): void {
		if (this.currentValue > this.data.minimum) {
			this.currentValue = Math.round(((this.currentValue -= this.data.step) / this.data.step) * this.data.step);
			this.updateEvent.emit(this.currentValue);
		}
	}
}
