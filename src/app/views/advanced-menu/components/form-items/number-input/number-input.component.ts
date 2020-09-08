import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// component input data DTO
export interface INumberPickerInput {
    label: string,
        minimum: number,
        maximum: number,
        step: number,
        value: number,
        showButtons ? : boolean,
}

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
    @Input() data: INumberPickerInput;
    @Output() updateEvent = new EventEmitter(); // output value on change

    showButtons: boolean = true;

    ngOnInit(): void {
        this.showButtons = this.data.showButtons ? this.data.showButtons : this.showButtons; // get value if supplied
    }

    updateInputValue(val: number): void {
        if (val > this.data.maximum) this.data.value = this.data.maximum;
        else if (val < this.data.minimum) this.data.value = this.data.minimum;
        else this.data.value = Number(val);
        this.updateEvent.emit(this.data.value);
    }

    // increments current value by step
    incrementInputValue(): void {
        if (this.data.value < this.data.maximum) {
            this.data.value = Math.round(((this.data.value += this.data.step) / this.data.step) * this.data.step);
            this.updateEvent.emit(this.data.value);
        }
    }

    // decrements current value by step
    decrementInputValue(): void {
        if (this.data.value > this.data.minimum) {
            this.data.value = Math.round(((this.data.value -= this.data.step) / this.data.step) * this.data.step);
            this.updateEvent.emit(this.data.value);
        }
    }
}