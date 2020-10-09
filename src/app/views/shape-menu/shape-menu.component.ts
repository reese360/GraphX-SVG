import { Component, OnInit } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { SvgShapeType } from 'src/app/enums/SvgShapeType.enum';
import { InputToolOptions } from 'src/app/enums/inputTools.enum';

@Component({
	selector: 'app-shape-menu',
	templateUrl: './shape-menu.component.html',
	styleUrls: ['./shape-menu.component.css'],
})
export class ShapeMenuComponent implements OnInit {
	selectedTool: number;
	selectedShape: SvgShapeType;

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
		this.selectedShape = SvgShapeType[clickValue];
		this.inputSvc.updateInputShapeOptions(SvgShapeType[clickValue]);
	}
}
