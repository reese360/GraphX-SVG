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
    alphaHex: string = 'ff'; // start at 100%

    constructor(private stateSvc: CurrentStateService, private inputSvc: InputService) {}

    ngOnInit(): void {
        this.componentState = this.stateSvc.fillOptionState;
    }

    updateHue(color): void {
        this.componentState.currentHue = color;
        this.componentState.currentColor = color;
        this.inputSvc.updateShapeStyleOptions('fill', this.colorStr);
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
        this.inputSvc.updateShapeStyleOptions('fill', this.colorStr);

    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha;
        this.alphaHex = (Math.round(Math.round(alpha * 100) / 100 * 255) + 0x10000).toString(16).substr(-2); // get 2 digit hex value of alpha
        this.inputSvc.updateShapeStyleOptions('fill', this.colorStr);
    }

    // get string of color and alpha levels in hex format
    get colorStr(): string {
        return `${this.componentState.currentColor}${this.alphaHex}`
    }

}