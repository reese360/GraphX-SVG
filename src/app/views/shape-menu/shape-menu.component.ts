import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { SvgShapeOption } from 'src/app/enums/svgShapeOption.enum';
import { InputToolOption } from 'src/app/enums/inputToolOption.enum';

@Component({
	selector: 'app-shape-menu',
	templateUrl: './shape-menu.component.html',
	styleUrls: ['./shape-menu.component.css'],
})
export class ShapeMenuComponent implements OnInit {
	selectedTool: number;
	selectedShape: SvgShapeOption;

	constructor(public inputSvc: InputService) {
		this.selectedTool = this.inputSvc.inputOptions.tool;
		this.selectedShape = this.inputSvc.inputOptions.shape;
	}

	ngOnInit(): void {}

	handleToolClick(clickValue: number): void {
		this.selectedTool = clickValue;
		this.inputSvc.updateInputToolOptions(clickValue);
	}

	handleShapeClick(clickValue: string): void {
		this.selectedShape = SvgShapeOption[clickValue as keyof typeof SvgShapeOption];
		this.inputSvc.updateInputShapeOptions(SvgShapeOption[clickValue as keyof typeof SvgShapeOption]);
	}
}
