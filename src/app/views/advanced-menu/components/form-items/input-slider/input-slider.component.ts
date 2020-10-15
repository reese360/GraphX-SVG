import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export type RangeSliderComponentInput = {
	label: string;
	minimum: number;
	maximum: number;
	step: number;
};

@Component({
	selector: 'app-input-slider',
	templateUrl: './input-slider.component.html',
	styleUrls: ['./input-slider.component.css'],
})
export class InputSliderComponent {
	@ViewChild('slider') sliderElRef: ElementRef; // reference to element for gradient control

	@Input() value: number;
	@Input() data: RangeSliderComponentInput;
	@Output() updateEvent: EventEmitter<number> = new EventEmitter<number>();

	get sliderGradient(): object {
		const gradStartStop = (this.value - this.data.minimum) / (this.data.maximum - this.data.minimum);
		return {
			'background-image': `-webkit-gradient(linear,
            left top,
            right top,
            color-stop(${gradStartStop}, var(--graphx-highlight1)),
            color-stop(${gradStartStop}, var(--graphx-light-gray)))`,
		};
	}

	// pass up input value and update gradient calculation
	updateValue(val: number): void {
		this.updateEvent.emit(val);
	}
}
