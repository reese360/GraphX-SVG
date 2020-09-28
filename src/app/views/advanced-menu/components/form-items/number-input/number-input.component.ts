import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// component input data DTO
export interface INumberPickerInput {
	label: string;
	minimum: number;
	maximum: number;
	step: number;
	showButtons?: boolean;
}

@Component({
	selector: 'app-number-input',
	templateUrl: './number-input.component.html',
	styleUrls: ['./number-input.component.css'],
})
export class NumberInputComponent implements OnInit {
	@Input() data: INumberPickerInput;
	@Input() currentValue: number = 1;
	@Output() updateEvent = new EventEmitter(); // output value on change

	showButtons: boolean = true;

	ngOnInit(): void {
		this.showButtons = this.data.showButtons ? this.data.showButtons : this.showButtons; // get value if supplied
	}

	// handle user directly inputting number
	updateInputValue(val: number): void {
		if (val > this.data.maximum) this.currentValue = this.data.maximum;
		else if (val < this.data.minimum) this.currentValue = this.data.minimum;
		else this.currentValue = Number(val);
		this.updateEvent.emit(this.currentValue);
	}

	// increments current value by step
	incrementInputValue(): void {
		if (this.currentValue < this.data.maximum) {
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
