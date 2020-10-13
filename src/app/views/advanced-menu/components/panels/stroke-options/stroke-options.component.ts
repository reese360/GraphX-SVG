import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';
import { SvgRenderOptions } from '../../../../../enums/SvgRenderOptions.enum';
import { SvgStrokeType } from '../../../../../enums/SvgStrokeType.enum';
import { IRangeSliderInput } from '../../form-items/input-slider/input-slider.component';
import { IInputNumberInput } from '../../form-items/input-number/input-number.component';
import { SvgStrokeLinecapType } from 'src/app/enums/SvgStrokeLinecap.enum';

@Component({
	selector: 'app-stroke-options',
	templateUrl: './stroke-options.component.html',
	styleUrls: ['./stroke-options.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class StrokeOptionsComponent implements OnInit {
	// component variables
	strokeColor: string;
	strokeAlpha: number;
	strokeType: SvgStrokeType;
	strokeWidth: number;
	strokeLinecap: SvgStrokeLinecapType;
	shapeRendering: SvgRenderOptions;

	// input fields component data
	strokeTypeData: IOptionSelectorInput = {
		label: 'Stroke Type',
		options: ['Solid', 'None'],
	};

	shapeRenderData: IOptionSelectorInput = {
		label: 'Shape Rendering',
		options: ['Auto', 'Speed', 'Contrast', 'Precision'],
	};

	strokeWidthData: IRangeSliderInput = {
		label: 'Stroke Width',
		maximum: 100,
		minimum: 1,
		step: 1,
	};

	strokeWidthNumberData: IInputNumberInput = {
		label: 'Pixel Width',
		maximum: 1000,
		minimum: 1,
		step: 1,
	};

	strokeLinecapData: IOptionSelectorInput = {
		label: 'Stroke Linecap',
		options: ['Butt', 'Round', 'Square'],
	};

	constructor(private inputSvc: InputService) {
		// set input values
		this.strokeColor = this.inputSvc.objectStyleOptions.stroke.substr(0, 7);
		this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.objectStyleOptions.stroke.substr(7, 9));
		this.strokeType = this.inputSvc.objectStyleOptions.strokeType;
		this.strokeWidth = this.inputSvc.objectStyleOptions.strokeWidth;
		this.strokeLinecap = this.inputSvc.objectStyleOptions.strokeLinecap;
		this.shapeRendering = this.inputSvc.objectStyleOptions.shapeRendering;

		// subscription to single selected object
		inputSvc.currentObjectEvent.subscribe((obj) => {
			this.strokeColor = this.inputSvc.objectStyleOptions.stroke.substr(0, 7);
			this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.objectStyleOptions.stroke.substr(7, 9));
			this.strokeType = this.inputSvc.objectStyleOptions.strokeType;
			this.strokeWidth = this.inputSvc.objectStyleOptions.strokeWidth;
			this.strokeLinecap = this.inputSvc.objectStyleOptions.strokeLinecap;
			this.shapeRendering = this.inputSvc.objectStyleOptions.shapeRendering;
		});
	}

	ngOnInit(): void {
		// set input values
		this.strokeColor = this.inputSvc.objectStyleOptions.stroke.substr(0, 7);
		this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.objectStyleOptions.stroke.substr(7, 9));
		this.strokeType = this.inputSvc.objectStyleOptions.strokeType;
		this.strokeWidth = this.inputSvc.objectStyleOptions.strokeWidth;
		this.strokeLinecap = this.inputSvc.objectStyleOptions.strokeLinecap;
		this.shapeRendering = this.inputSvc.objectStyleOptions.shapeRendering;
	}

	handleStrokeTypeChange(type): void {
		this.strokeType = type === 0 ? SvgStrokeType.solid : SvgStrokeType.none;
		this.inputSvc.updateObjectStyleOptions('strokeType', type === 0 ? SvgStrokeType.solid : SvgStrokeType.none);
	}

	handleColorChange(color): void {
		this.strokeColor = color;
		this.inputSvc.updateObjectStyleOptions('stroke', `${this.strokeColor}${this.strokeAlphaHex}`);
	}

	handleStrokeWidthChange(width: number): void {
		this.strokeWidth = width;
		this.inputSvc.updateObjectStyleOptions('strokeWidth', width);
	}

	handleShapeRenderChange(option): void {
		this.shapeRendering = option as SvgRenderOptions;
		this.inputSvc.updateObjectStyleOptions('shapeRendering', option as SvgRenderOptions);
	}

	handleAlphaChange(alpha): void {
		this.strokeAlpha = alpha * 100;
		this.inputSvc.updateObjectStyleOptions('stroke', `${this.strokeColor}${this.strokeAlphaHex}`);
	}

	handleStrokeLinecapChange(option: number): void {
		this.strokeLinecap = option as SvgStrokeLinecapType;
		this.inputSvc.updateObjectStyleOptions('strokeLinecap', option as SvgStrokeLinecapType);
	}

	// convert alpha hex value to decimal percentage
	alphaHexToDecimal(hex: string): number {
		const alpha = parseInt(hex, 16); // convert alpha hex to [0:255]
		return Number(((alpha / 255) * 100).toFixed(0)); // convert to percentage
	}

	// convert current alpha value to percentage string
	get strokeAlphaPercent(): string {
		return `${this.strokeAlpha}%`;
	}

	get strokeAlphaHex(): string {
		return (Math.round((Math.round(this.strokeAlpha) / 100) * 255) + 0x10000).toString(16).substr(-2);
	}
}
