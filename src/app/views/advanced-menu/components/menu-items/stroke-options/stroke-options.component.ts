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
    alphaHex: string = 'ff'; // start at 100%

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
        this.inputService.updateStrokeColor(this.colorStr); // update observable
    }

    updateSaturation(color): void {
        this.componentState.currentColor = color;
        this.inputService.updateStrokeColor(this.colorStr); // update alpha observable
    }

    updateAlpha(alpha): void {
        this.componentState.currentAlpha = alpha;
        this.alphaHex = (Math.round(Math.round(alpha * 100) / 100 * 255) + 0x10000).toString(16).substr(-2); // get 2 digit hex value of alpha
        this.inputService.updateStrokeColor(this.colorStr);
    }

    updateShapeRender(option): void {
        this.componentState.shapeRender.value = option;
    }

    // get string of color and alpha levels in hex format
    get colorStr(): string {
        return `${this.componentState.currentColor}${this.alphaHex}`
    }
}