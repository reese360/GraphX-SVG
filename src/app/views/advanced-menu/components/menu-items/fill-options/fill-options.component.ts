import { Component, OnInit } from '@angular/core';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface FillOptionsComponentState {
    fillType: IOptionSelectorInput;
    currentColor: string;
    currentAlpha: string;
    currentHue: string;
}

@Component({
    selector: 'app-fill-options',
    templateUrl: './fill-options.component.html',
    styleUrls: ['./fill-options.component.css']
})
export class FillOptionsComponent implements OnInit {
    componentState: FillOptionsComponentState;

    constructor(private stateSvc: CurrentStateService, private inputSvc: InputService) {}

    ngOnInit(): void {
        this.componentState = this.stateSvc.fillOptionState;
    }

    updateHue(color): void {
        this.componentState.currentHue = color;
        this.componentState.currentColor = color;
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha;
    }

}