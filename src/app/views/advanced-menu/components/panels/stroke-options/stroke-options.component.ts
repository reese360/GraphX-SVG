import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { OptionSelectorComponentInput } from '../../form-items/option-selector/option-selector.component';
// import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';
import { SvgRenderOption } from '../../../../../enums/svgRenderOption.enum';
import { SvgStrokeOption } from '../../../../../enums/svgStrokeOption.enum';
import { RangeSliderComponentInput } from '../../form-items/input-slider/input-slider.component';
import { InputNumberComponentInput } from '../../form-items/input-number/input-number.component';
import { SvgStrokeLinecapOption } from 'src/app/enums/svgStrokeLinecapOption.enum';

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
	strokeType: SvgStrokeOption;
	strokeWidth: number;
	strokeLinecap: SvgStrokeLinecapOption;
	shapeRendering: SvgRenderOption;

	// input fields component data
	strokeTypeData: OptionSelectorComponentInput = {
		label: 'Stroke Type',
		options: ['Solid', 'None'],
	};

	shapeRenderData: OptionSelectorComponentInput = {
		label: 'Shape Rendering',
		options: ['Auto', 'Speed', 'Contrast', 'Precision'],
	};

	strokeWidthData: RangeSliderComponentInput = {
		label: 'Stroke Width',
		maximum: 100,
		minimum: 1,
		step: 1,
	};

	strokeWidthNumberData: InputNumberComponentInput = {
		label: 'Pixel Width',
		maximum: 1000,
		minimum: 1,
		step: 1,
	};

	strokeLinecapData: OptionSelectorComponentInput = {
		label: 'Stroke Linecap',
		options: ['Butt', 'Round', 'Square'],
	};

	constructor(private inputSvc: InputService) {
		// set input values
		this.strokeColor = this.inputSvc.styleOptions.stroke.substr(0, 7);
		this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.styleOptions.stroke.substr(7, 9));
		this.strokeType = this.inputSvc.styleOptions.strokeType;
		this.strokeWidth = this.inputSvc.styleOptions.strokeWidth;
		this.strokeLinecap = this.inputSvc.styleOptions.strokeLinecap;
		this.shapeRendering = this.inputSvc.styleOptions.shapeRendering;

		// subscription to single selected object
		inputSvc.currentObjectEvent.subscribe((obj) => {
			this.strokeColor = this.inputSvc.styleOptions.stroke.substr(0, 7);
			this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.styleOptions.stroke.substr(7, 9));
			this.strokeType = this.inputSvc.styleOptions.strokeType;
			this.strokeWidth = this.inputSvc.styleOptions.strokeWidth;
			this.strokeLinecap = this.inputSvc.styleOptions.strokeLinecap;
			this.shapeRendering = this.inputSvc.styleOptions.shapeRendering;
		});
	}

	ngOnInit(): void {
		// set input values
		this.strokeColor = this.inputSvc.styleOptions.stroke.substr(0, 7);
		this.strokeAlpha = this.alphaHexToDecimal(this.inputSvc.styleOptions.stroke.substr(7, 9));
		this.strokeType = this.inputSvc.styleOptions.strokeType;
		this.strokeWidth = this.inputSvc.styleOptions.strokeWidth;
		this.strokeLinecap = this.inputSvc.styleOptions.strokeLinecap;
		this.shapeRendering = this.inputSvc.styleOptions.shapeRendering;
	}

	handleStrokeTypeChange(type: number): void {
		this.strokeType = type === 0 ? SvgStrokeOption.solid : SvgStrokeOption.none;
		this.inputSvc.updateStyleOptions('strokeType', type === 0 ? SvgStrokeOption.solid : SvgStrokeOption.none);
	}

	handleColorChange(color: string): void {
		this.strokeColor = color;
		this.inputSvc.updateStyleOptions('stroke', `${this.strokeColor}${this.strokeAlphaHex}`);
	}

	handleStrokeWidthChange(width: number): void {
		this.strokeWidth = width;
		this.inputSvc.updateStyleOptions('strokeWidth', width);
	}

	handleShapeRenderChange(option: SvgRenderOption): void {
		this.shapeRendering = option as SvgRenderOption;
		this.inputSvc.updateStyleOptions('shapeRendering', option as SvgRenderOption);
	}

	handleAlphaChange(alpha: number): void {
		this.strokeAlpha = alpha * 100;
		this.inputSvc.updateStyleOptions('stroke', `${this.strokeColor}${this.strokeAlphaHex}`);
	}

	handleStrokeLinecapChange(option: number): void {
		this.strokeLinecap = option as SvgStrokeLinecapOption;
		this.inputSvc.updateStyleOptions('strokeLinecap', option as SvgStrokeLinecapOption);
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
