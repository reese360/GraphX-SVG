import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// component input data DTO
export interface IOptionSelectorInput {
	label: string;
	options: string[];
}

@Component({
	selector: 'app-option-selector',
	templateUrl: './option-selector.component.html',
	styleUrls: ['./option-selector.component.css'],
})
export class OptionSelectorComponent implements OnInit {
	@Input() data: IOptionSelectorInput;
	@Input() currentValue: number = 0;
	@Output() updateEvent = new EventEmitter();

	ngOnInit(): void {}

	toggleOption(idx: number): void {
		this.updateEvent.emit(idx);
	}
}
