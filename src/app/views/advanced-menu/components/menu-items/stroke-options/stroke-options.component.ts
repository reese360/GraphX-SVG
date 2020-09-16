import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface StrokeOptionsComponentState {
    strokeType: IOptionSelectorInput;
    shapeRender: IOptionSelectorInput;
    currentColor: string;
    currentAlpha: string;
    currentHue: string;
}

@Component({
    selector: 'app-stroke-options',
    templateUrl: './stroke-options.component.html',
    styleUrls: ['./stroke-options.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StrokeOptionsComponent implements OnInit {
    componentState: StrokeOptionsComponentState;

    constructor(private stateSvc: CurrentStateService, private inputService: InputService) {}

    ngOnInit(): void {
        this.componentState = this.stateSvc.strokeOptionState;
    }

    updateStrokeType(type): void {
        this.componentState.strokeType.value = type;
    }

    updateHue(color): void {
        this.componentState.currentColor = color;
        this.componentState.currentHue = color;
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha;
    }

    updateShapeRender(option): void {
        this.componentState.shapeRender.value = option;
    }
}