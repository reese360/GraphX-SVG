import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentStateService } from '../../../../../services/currentState.service';
import { InputService } from '../../../../../services/inputTool.service';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface ViewBoxComponentState {
	vbWidthData: INumberPickerInput;
	vbHeightData: INumberPickerInput;
	vbDisplayData: IOptionSelectorInput;
	vbOutlineData: IOptionSelectorInput;
	vbOpacityData: IOptionSelectorInput;
	isViewBoxLocked: boolean;
	viewBoxRatio: number;
}

@Component({
	selector: 'app-viewbox',
	templateUrl: './viewbox.component.html',
	styleUrls: ['./viewbox.component.css'],
})
export class ViewBoxComponent implements OnInit {
	@ViewChild('vbWidth') vbWidth: NumberInputComponent;
	@ViewChild('vbHeight') vbHeight: NumberInputComponent;

	componentState: ViewBoxComponentState;

	constructor(private inputSvc: InputService, private stateSvc: CurrentStateService) {}

	ngOnInit(): void {
		this.componentState = this.stateSvc.viewBoxState;
	}

	// modifies viewbox width
	updateViewBoxWidth(width): void {
		if (this.componentState.isViewBoxLocked) this.vbHeight.data.value = Math.trunc(width / this.componentState.viewBoxRatio);

		this.inputSvc.updateCanvasOptions('dimensions', [width, this.componentState.vbHeightData.value]);
		this.componentState.vbWidthData.value = width;
	}

	// modifies viewbox height
	updateViewBoxHeight(height): void {
		if (this.componentState.isViewBoxLocked) this.vbWidth.data.value = Math.trunc(height * this.componentState.viewBoxRatio);

		this.inputSvc.updateCanvasOptions('dimensions', [this.componentState.vbWidthData.value, height]);
		this.componentState.vbHeightData.value = height;
	}

	// toggles aspect ratio lock
	toggleLock(): void {
		this.componentState.isViewBoxLocked = !this.componentState.isViewBoxLocked;
		if (this.componentState.isViewBoxLocked) this.componentState.viewBoxRatio = this.componentState.vbWidthData.value / this.componentState.vbHeightData.value;
	}

	// turns on/off viewbox canvas
	toggleViewBox(option): void {
		this.componentState.vbDisplayData.value = option;
		this.inputSvc.updateCanvasOptions('display', option);
	}

	// turns on/off viewbox outline
	toggleViewBoxOutline(option): void {
		this.componentState.vbOutlineData.value = option;
		// this.inputSvc.toggleCanvasOutline(option);
		this.inputSvc.updateCanvasOptions('outline', option);
	}

	// turns on/off viewbox outline
	toggleViewBoxOpacity(option): void {
		const optionValue = option === 0 ? 0 : option === 1 ? 0.5 : 1; // convert to numeric value
		this.componentState.vbOpacityData.value = option;
		this.inputSvc.updateCanvasOptions('opacity', optionValue);
	}
}
