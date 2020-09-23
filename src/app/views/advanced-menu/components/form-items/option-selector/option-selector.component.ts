import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// component input data DTO
export interface IOptionSelectorInput {
    label: string,
        options: string[],
        value: number
}

@Component({
    selector: 'app-option-selector',
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.css'],
})
export class OptionSelectorComponent implements OnInit {
    @Input() data: IOptionSelectorInput;
    @Output() updateEvent = new EventEmitter();

    ngOnInit(): void {}

    toggleOptions(idx: number): void {
        this.updateEvent.emit(idx);
    }
}