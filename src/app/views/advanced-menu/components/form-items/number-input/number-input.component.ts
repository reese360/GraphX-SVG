import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
    @Input() label: string;
    @Input() minimum: number;
    @Input() maximum: number;
    @Input() step: number;
    @Input() value: number;

    @Output() valueUpdate = new EventEmitter(); // output value on change

    ngOnInit(): void {}

    updateInputValue(val: number): void {
        if (val > this.maximum) this.value = this.maximum;
        else if (val < this.minimum) this.value = this.minimum;
        else this.value = Number(val);
        this.valueUpdate.emit(this.value);
    }

    // increments current value by step
    incrementInputValue(): void {
        if (this.value < this.maximum) {
            this.value = Math.round(((this.value += this.step) / this.step) * this.step);
            this.valueUpdate.emit(this.value);
        }
    }

    // decrements current value by step
    decrementInputValue(): void {
        if (this.value > this.minimum) {
            this.value = Math.round(((this.value -= this.step) / this.step) * this.step);
            this.valueUpdate.emit(this.value);
        }
    }
}