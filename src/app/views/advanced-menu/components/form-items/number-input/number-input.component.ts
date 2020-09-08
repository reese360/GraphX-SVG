import { Component, OnInit, ElementRef, ViewChild, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
    // @ViewChild('inputField') inputField: ElementRef;
    inputField = new FormControl('');

    @Input() label: string;
    @Input() minimum: number;
    @Input() maximum: number;
    @Input() step: number;
    @Input() startingValue: number;

    constructor() {}

    ngOnInit(): void {}

    @HostListener('inputField') onChange(): void {
        console.log(true);
    }

    incrementInput(val: number): void {
        const value = Number(val) + 1;
    }

    decrementInput(val: number): void {

    }
}