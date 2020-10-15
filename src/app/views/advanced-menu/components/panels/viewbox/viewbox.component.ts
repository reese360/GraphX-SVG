import { Component, OnInit, ViewChild } from '@angular/core';
import { InputService } from '../../../../../services/inputTool.service';
import { InputNumberComponent, InputNumberComponentInput } from '../../form-items/input-number/input-number.component';
import { CanvasViewBoxSettings } from '../../../../../common/types/canvasViewBoxSettings.type';
import { OptionSelectorComponentInput } from '../../form-items/option-selector/option-selector.component';

@Component({
	selector: 'app-viewbox',
	templateUrl: './viewbox.component.html',
	styleUrls: ['./viewbox.component.css'],
})
export class ViewBoxComponent implements OnInit {
	@ViewChild('vbWidth') vbWidth: InputNumberComponent;
	@ViewChild('vbHeight') vbHeight: InputNumberComponent;

	vbDisplayOption: number;
	vbOutlineOption: number;
	vbOpacityOption: number;
	vbWidthOption: number;
	vbHeightOption: number;
	viewBoxRatio: number;

	vbDisplayData: OptionSelectorComponentInput = {
		label: 'ViewBox',
		options: ['Off', 'On'],
	};

	vbOutlineData: OptionSelectorComponentInput = {
		label: 'ViewBox Outline',
		options: ['Off', 'On'],
	};

	vbOpacityData: OptionSelectorComponentInput = {
		label: 'ViewBox Transparency',
		options: ['0%', '50%', '100%'],
	};

	vbWidthData: InputNumberComponentInput = {
		label: 'Width',
		minimum: 1,
		maximum: 9999,
		step: 1,
	};

	vbHeightData: InputNumberComponentInput = {
		label: 'Height',
		minimum: 1,
		maximum: 9999,
		step: 1,
	};

	constructor(private inputSvc: InputService) {
		this.getInputData();
	}

	ngOnInit(): void {
		this.getInputData();
	}

	getInputData(): void {
		this.vbDisplayOption = this.inputSvc.canvasViewBoxOptions['display'];
		this.vbOutlineOption = this.inputSvc.canvasViewBoxOptions['outline'];
		this.vbOpacityOption = this.inputSvc.canvasViewBoxOptions['opacity'];
		this.vbWidthOption = this.inputSvc.canvasViewBoxOptions['dimensions'][0];
		this.vbHeightOption = this.inputSvc.canvasViewBoxOptions['dimensions'][1];
		this.viewBoxRatio = this.inputSvc.canvasViewBoxOptions['vbRatio'];
	}

	// modifies viewbox width
	updateViewBoxWidth(width: number): void {
		if (this.isViewBoxLocked) this.vbHeightOption = Math.trunc(width / this.viewBoxRatio);

		this.inputSvc.updateCanvasViewBoxOptions('dimensions', [width, this.vbHeightOption]);
		this.vbWidthOption = width;
	}

	// modifies viewbox height
	updateViewBoxHeight(height: number): void {
		if (this.isViewBoxLocked) this.vbWidthOption = Math.trunc(height * this.viewBoxRatio);

		this.inputSvc.updateCanvasViewBoxOptions('dimensions', [this.vbWidthOption, height]);
		this.vbHeightOption = height;
	}

	// toggles aspect ratio lock
	toggleLock(): void {
		if (this.viewBoxRatio) this.viewBoxRatio = null;
		else this.viewBoxRatio = this.vbWidthOption / this.vbHeightOption;
		this.inputSvc.canvasViewBoxOptions['vbRatio'] = this.viewBoxRatio;
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
		this.vbOpacityOption = option;
		this.inputSvc.updateCanvasViewBoxOptions('opacity', option);
	}

	get isViewBoxLocked(): boolean {
		return this.viewBoxRatio !== null;
	}
}
