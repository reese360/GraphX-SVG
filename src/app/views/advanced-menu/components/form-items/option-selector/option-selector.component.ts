import {
    Component,
    OnInit,
    Input,
    Renderer2,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'app-option-selector',
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.css'],
})
export class OptionSelectorComponent implements OnInit {
    @Input() options: string[];
    @Input() default: number;
    @Input() label: string = '';
    @Output() optionEvent = new EventEmitter();

    selIdx: number = 0;

    constructor(private renderer: Renderer2) {}

    ngOnInit(): void {
        this.selIdx = this.default;
    }

    toggleOptions(idx: number): void {
        this.selIdx = idx;
        this.optionEvent.emit(this.options[idx]);
    }


}