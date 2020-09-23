import { Component, OnInit } from '@angular/core';
import { SvgFillType } from 'src/app/enums/SvgFillType.enum';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface FillOptionsComponentState {
    fillType: IOptionSelectorInput;
    currentColor: string;
    currentHue: string;
    currentAlpha: number;
}

@Component({
    selector: 'app-fill-options',
    templateUrl: './fill-options.component.html',
    styleUrls: ['./fill-options.component.css']
})
export class FillOptionsComponent implements OnInit {
    componentState: FillOptionsComponentState;
    alphaHex: string = 'ff'; // start at 100%

    constructor(private stateSvc: CurrentStateService, private inputSvc: InputService) {
        // set component state to current state
        this.componentState = this.stateSvc.fillOptionState;

        // initialize input service states
        this.inputSvc.objectStyleOptions.fillType = this.componentState.fillType.value;
        this.inputSvc.objectStyleOptions.fill = this.colorStr;

        // subscription to single selected object
        inputSvc.currentObjectEvent.subscribe((obj) => {
            this.componentState.fillType.value = obj.elementStyle.fillType;
            this.componentState.currentHue = obj.elementStyle.fill.substring(0, 7); // clip color hex
            this.componentState.currentColor = obj.elementStyle.fill.substring(0, 7);
            this.componentState.currentAlpha = this.alphaHexToDecimal(obj.elementStyle['fill'].substring(7, 9)); // clip alpha hex
        });
    }

    ngOnInit(): void {
        this.componentState = this.stateSvc.fillOptionState;
    }

    updateHue(color): void {
        this.componentState.currentHue = color;
        this.componentState.currentColor = color;
        this.inputSvc.updateObjectStyleOptions('fill', this.colorStr);
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
        this.inputSvc.updateObjectStyleOptions('fill', this.colorStr);
    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha * 100;
        this.alphaHex = (Math.round(Math.round(alpha * 100) / 100 * 255) + 0x10000).toString(16).substr(-2); // convert alpha to hex
        this.inputSvc.updateObjectStyleOptions('fill', this.colorStr);
    }

    // convert alpha hex value to decimal percentage
    alphaHexToDecimal(hex: string): number {
        const alpha = parseInt(hex, 16); // convert alpha hex to [0:255]
        return Number(((alpha / 255) * 100).toFixed(0)); // convert to percentage
    }

    // update fill type
    updateFillType(option: number): void {
        this.componentState.fillType.value = option;
        this.inputSvc.updateObjectStyleOptions('fillType', option === 0 ? SvgFillType.solid : SvgFillType.none);
    }

    // get string of color and alpha levels in hex format
    get colorStr(): string {
        return `${this.componentState.currentColor}${this.alphaHex}`
    }

    // convert current alpha value to percentage string
    get alphaPctStr(): string {
        return `${this.componentState.currentAlpha}%`;
    }
}