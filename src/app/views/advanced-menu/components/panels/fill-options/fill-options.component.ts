import { Component, OnInit } from '@angular/core';
import { SvgFillOption } from 'src/app/enums/svgFillOption.enum';
import { InputService } from 'src/app/services/inputTool.service';
import { OptionSelectorComponentInput } from '../../form-items/option-selector/option-selector.component';

@Component({
	selector: 'app-fill-options',
	templateUrl: './fill-options.component.html',
	styleUrls: ['./fill-options.component.css'],
})
export class FillOptionsComponent implements OnInit {
	// component variables
	fillColor: string;
	fillAlpha: number;
	fillType: SvgFillOption;

	// input field component data
	fillTypeData: OptionSelectorComponentInput = {
		label: 'Fill Type',
		options: ['Solid', 'None'],
	};

	constructor(private inputSvc: InputService) {
		// set input values
		this.fillColor = this.inputSvc.styleOptions.fill.substr(0, 7);
		this.fillAlpha = this.alphaHexToDecimal(this.inputSvc.styleOptions.fill.substr(7, 9));
		this.fillType = this.inputSvc.styleOptions.fillType;

		// subscription to a single selected object
		inputSvc.currentObjectEvent.subscribe((obj) => {
			this.fillColor = obj.style.fill.substr(0, 7);
			this.fillAlpha = this.alphaHexToDecimal(obj.style.fill.substring(7, 9));
			this.fillType = obj.style.fillType;
		});
	}

	ngOnInit(): void {
		// set input values
		this.fillColor = this.inputSvc.styleOptions.fill.substr(0, 7);
		this.fillAlpha = this.alphaHexToDecimal(this.inputSvc.styleOptions.fill.substr(7, 9));
		this.fillType = this.inputSvc.styleOptions.fillType;
	}

	handleColorChange(color: string): void {
		this.fillColor = color;
		this.inputSvc.updateStyleOptions('fill', `${this.fillColor}${this.fillAlphaHex}`);
	}

	handleAlphaChange(alpha: number): void {
		this.fillAlpha = alpha * 100;
		this.inputSvc.updateStyleOptions('fill', `${this.fillColor}${this.fillAlphaHex}`);
	}

	// update fill type
	handleFillTypeChange(option: number): void {
		this.fillType = option as SvgFillOption;
		this.inputSvc.updateStyleOptions('fillType', option as SvgFillOption);
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
		return (Math.round((Math.round(this.fillAlpha) / 100) * 255) + 0x10000).toString(16).substr(-2);
	}
}
