import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';
import { SvgRenderOptions } from '../../../../../enums/SvgRenderOptions.enum';
import { SvgStrokeType } from '../../../../../enums/SvgStrokeType.enum'

export interface StrokeOptionsComponentState {
    strokeType: IOptionSelectorInput;
    shapeRender: IOptionSelectorInput;
    currentColor: string;
    currentHue: string;
    currentAlpha: number;
}

@Component({
    selector: 'app-stroke-options',
    templateUrl: './stroke-options.component.html',
    styleUrls: ['./stroke-options.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StrokeOptionsComponent implements OnInit {
    componentState: StrokeOptionsComponentState;
    alphaHex: string = 'ff'; // start at 100%

    constructor(private stateSvc: CurrentStateService, private inputSvc: InputService) {
        // set component state to current state
        this.componentState = this.stateSvc.strokeOptionState;

        // initialize input service states
        this.inputSvc.objectStyleOptions.strokeType = this.componentState.strokeType.value;
        this.inputSvc.objectStyleOptions.stroke = this.componentState.currentColor;

        // subscription to single selected object
        inputSvc.currentObjectEvent.subscribe((obj) => {
            this.componentState.strokeType.value = obj.elementStyle.strokeType;
            this.componentState.shapeRender.value = obj.elementStyle.shapeRendering;
            this.componentState.currentHue = obj.elementStyle['stroke'].substring(0, 7); // clip color hex
            this.componentState.currentColor = obj.elementStyle['stroke'].substring(0, 7); // clip color hex
            this.componentState.currentAlpha = this.alphaHexToDecimal(obj.elementStyle['stroke'].substring(7, 9)); // clip alpha hex
        });
    }

    ngOnInit(): void {
        this.componentState = this.stateSvc.strokeOptionState;
    }

    updateStrokeType(type): void {
        this.componentState.strokeType.value = type;
        this.inputSvc.updateObjectStyleOptions('strokeType', type === 0 ? SvgStrokeType.solid : SvgStrokeType.none);
    }

    updateHue(color): void {
        this.componentState.currentColor = color;
        this.componentState.currentHue = color;
        this.inputSvc.updateObjectStyleOptions('stroke', this.colorStr);
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
        this.inputSvc.updateObjectStyleOptions('stroke', this.colorStr);
    }

    updateShapeRender(option): void {
        this.componentState.shapeRender.value = option;
        switch (option) {
            case 0:
                this.inputSvc.updateObjectStyleOptions('shape-rendering', SvgRenderOptions.auto);
                break;
            case 1:
                this.inputSvc.updateObjectStyleOptions('shape-rendering', SvgRenderOptions.optimizeSpeed);
                break;
            case 2:
                this.inputSvc.updateObjectStyleOptions('shape-rendering', SvgRenderOptions.crispEdges);
                break;
            case 3:
                this.inputSvc.updateObjectStyleOptions('shape-rendering', SvgRenderOptions.geometricPrecision);
                break;
        }
    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha * 100;
        this.alphaHex = (Math.round(Math.round(alpha * 100) / 100 * 255) + 0x10000).toString(16).substr(-2); // convert alpha to hex
        this.inputSvc.updateObjectStyleOptions('stroke', this.colorStr);
    }

    // convert alpha hex value to decimal percentage
    alphaHexToDecimal(hex: string): number {
        const alpha = parseInt(hex, 16); // convert alpha hex to [0:255]
        return Number(((alpha / 255) * 100).toFixed(0)); // convert to percentage
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