import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToolInputService } from '../../services/toolInput.service';

@Component({
	selector: 'app-toolbox',
	templateUrl: './toolbox.component.html',
	styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent implements OnInit {
	strokeColorDisplay: string;
	fillColorDisplay: string;

	constructor(public toolService: ToolInputService) {
		// set initial tooling options
		this.toolService.currentTool = this.toolService.toolsOptions.draw;
		this.toolService.currentShape = this.toolService.shapeOptions.polyline;
		this.toolService.strokeColor = '#000000'; // black
		this.toolService.fillColor = 'none'; // no fill
	}

	ngOnInit(): void {}

	updateTool(tool: string): void {
		this.toolService.currentTool = this.toolService.toolsOptions[tool];
	}

	updateShape(shape: string): void {
		this.toolService.currentShape = this.toolService.shapeOptions[shape];
		this.toolService.currentTool = this.toolService.toolsOptions.draw; // activate draw tool on shape change
	}

	updateColors(element: string, newColor: string): void {
		switch (element) {
			case 'scp': {
				this.strokeColorDisplay = newColor;
				this.toolService.strokeColor = newColor === 'transparent' ? 'none' : newColor;
				break;
			}
			case 'fcp': {
				this.fillColorDisplay = newColor;
				this.toolService.fillColor = newColor === 'transparent' ? 'none' : newColor;
				break;
			}
		}
	}
}
