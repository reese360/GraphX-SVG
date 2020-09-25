import { Component, OnInit } from '@angular/core';
import { SvgFillType } from 'src/app/enums/SvgFillType.enum';
import { CurrentStateService } from 'src/app/services/currentState.service';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

@Component({
    selector: 'app-fill-options',
    templateUrl: './fill-options.component.html',
    styleUrls: ['./fill-options.component.css']
})
export class FillOptionsComponent implements OnInit {
    // component variables
    fillColor: string;
    fillAlpha: number;
    fillType: SvgFillType;

    // input field component data
    fillTypeData: IOptionSelectorInput = {
        label: 'Fill Type',
        options: ['Solid', 'None'],
        value: 0
    }

    constructor(private inputSvc: InputService) {
        // set input values
        this.fillColor = this.inputSvc.objectStyleOptions.fill.substr(0, 7);
        this.fillAlpha = this.alphaHexToDecimal(this.inputSvc.objectStyleOptions.fill.substr(7, 9));
        this.fillType = this.inputSvc.objectStyleOptions.fillType;

        // subscription to a single selected object
        inputSvc.currentObjectEvent.subscribe((obj) => {
            this.fillColor = obj.style.fill.substr(0, 7);
            this.fillAlpha = this.alphaHexToDecimal(obj.style.fill.substring(7, 9));
            this.fillType = obj.style.fillType;
        });
    }

    ngOnInit(): void {
        // set input values
        this.fillColor = this.inputSvc.objectStyleOptions.fill.substr(0, 7);
        this.fillAlpha = this.alphaHexToDecimal(this.inputSvc.objectStyleOptions.fill.substr(7, 9));
        this.fillType = this.inputSvc.objectStyleOptions.fillType;
    }

    handleColorChange(color): void {
        this.fillColor = color;
        this.inputSvc.updateObjectStyleOptions('fill', `${this.fillColor}${this.fillAlphaHex}`);
    }

    handleAlphaChange(alpha): void {
        this.fillAlpha = alpha * 100;
        this.inputSvc.updateObjectStyleOptions('fill', `${this.fillColor}${this.fillAlphaHex}`);
    }

    // update fill type
    handleFillTypeChange(option: number): void {
        this.fillType = option as SvgFillType;
        this.inputSvc.updateObjectStyleOptions('fillType', option as SvgFillType);
    }

    // convert alpha hex value to decimal percentage
    alphaHexToDecimal(hex: string): number {
        const alpha = parseInt(hex, 16); // convert alpha hex to [0:255]
        return Number(((alpha / 255) * 100).toFixed(0)); // convert to percentage
    }

    // convert current alpha value to percentage string
    get fillAlphaPercent(): string {
        return `${this.fillAlpha}%`;
    }

    // convert numeric alpha to hex
    get fillAlphaHex(): string {
        return (Math.round(Math.round(this.fillAlpha) / 100 * 255) + 0x10000).toString(16).substr(-2);
    }
}