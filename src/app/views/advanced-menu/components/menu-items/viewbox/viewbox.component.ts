import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentStateService } from '../../../../../services/currentState.service';
import { InputService } from '../../../../../services/inputTool.service';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface ViewBoxComponentState {
	vbWidthData: INumberPickerInput;
	vbHeightData: INumberPickerInput;
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

	vbDisplayOption: number;
	vbOutlineOption: number;
	vbOpacityOption: number;

	vbDisplayData: IOptionSelectorInput = {
		label: 'ViewBox',
		options: ['Off', 'On'],
		value: 1,
	};

	vbOutlineData: IOptionSelectorInput = {
		label: 'ViewBox Outline',
		options: ['Off', 'On'],
		value: 1,
	};

	vbOpacityData: IOptionSelectorInput = {
		label: 'ViewBox Transparency',
		options: ['0%', '50%', '100%'],
		value: 2,
	};

	componentState: ViewBoxComponentState;

	constructor(private inputSvc: InputService, private stateSvc: CurrentStateService) {
		this.vbDisplayOption = this.inputSvc.canvasViewBoxOptions['display'];
		this.vbOutlineOption = this.inputSvc.canvasViewBoxOptions['outline'];
		this.vbOpacityOption = this.inputSvc.canvasViewBoxOptions['opacity'];
	}

	ngOnInit(): void {
		this.vbDisplayOption = this.inputSvc.canvasViewBoxOptions['display'];
		this.vbOutlineOption = this.inputSvc.canvasViewBoxOptions['outline'];
		this.vbOpacityOption = this.inputSvc.canvasViewBoxOptions['opacity'];
		this.componentState = this.stateSvc.viewBoxState;
	}

	// modifies viewbox width
	updateViewBoxWidth(width: number): void {
		if (this.componentState.isViewBoxLocked) this.vbHeight.data.value = Math.trunc(width / this.componentState.viewBoxRatio);

		this.inputSvc.updateCanvasViewBoxOptions('dimensions', [width, this.componentState.vbHeightData.value]);
		this.componentState.vbWidthData.value = width;
	}

	// modifies viewbox height
	updateViewBoxHeight(height: number): void {
		if (this.componentState.isViewBoxLocked) this.vbWidth.data.value = Math.trunc(height * this.componentState.viewBoxRatio);

		this.inputSvc.updateCanvasViewBoxOptions('dimensions', [this.componentState.vbWidthData.value, height]);
		this.componentState.vbHeightData.value = height;
	}

	// toggles aspect ratio lock
	toggleLock(): void {
		this.componentState.isViewBoxLocked = !this.componentState.isViewBoxLocked;
		if (this.componentState.isViewBoxLocked) this.componentState.viewBoxRatio = this.componentState.vbWidthData.value / this.componentState.vbHeightData.value;
	}

	// turns on/off viewbox canvas
	toggleViewBox(option: number): void {
		this.vbDisplayOption = option;
		this.inputSvc.updateCanvasViewBoxOptions('display', option);
	}

	// turns on/off viewbox outline
	toggleViewBoxOutline(option: number): void {
		this.vbOutlineOption = option;
		this.inputSvc.updateCanvasViewBoxOptions('outline', option);
	}

	// turns on/off viewbox outline
	toggleViewBoxOpacity(option: number): void {
		const optionValue = option === 0 ? 0 : option === 1 ? 0.5 : 1; // convert to numeric value
		this.vbOpacityOption = option;
		this.inputSvc.updateCanvasViewBoxOptions('opacity', option);
	}
}
