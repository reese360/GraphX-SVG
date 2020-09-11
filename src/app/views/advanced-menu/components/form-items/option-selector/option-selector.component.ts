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
    public selectedIdx: number = 0; // currently selected options index

    ngOnInit(): void {
        this.selectedIdx = this.data.value;
    }

    toggleOptions(idx: number): void {
        this.selectedIdx = idx;
        this.updateEvent.emit(idx);
    }
}