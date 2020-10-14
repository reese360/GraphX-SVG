import { Component, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { SvgShapeOption } from '../../enums/SvgShapeOption.enum';

@Component({
	selector: 'app-top-menu',
	templateUrl: './top-menu.component.html',
	styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements AfterViewInit {
	strokePickerOpen: boolean = false;
	fillPickerOpen: boolean = false;
	strokeColor: string;
	fillColor: string;

	zoomLevelDisplay: string = '100%';
	mouseX: number = 0;
	mouseY: number = 0;

	constructor(public inputSvc: InputService, public renderer: Renderer2) {
		// set initial tooling options
		// this.inputSvc.currentTool = this.inputSvc.toolsOptions.draw;
		// this.inputSvc.currentShape = SvgShapeType.polyline;

		// subscription for mouse coord display
		this.inputSvc.mouseCoordsEvent.subscribe((pos) => {
			this.mouseX = pos[0];
			this.mouseY = pos[1];
		});

		// subscription for zoom level
		this.inputSvc.zoomLevelEvent.subscribe((level) => {
			this.zoomLevelDisplay = `${100 * level}%`;
		});
	}
	ngAfterViewInit(): void {
		// window event listeners to open/close color pickers
		// this.renderer.listen('window', 'click', (e: Event) => {
		// 	if (e.target === this.strokeColorDisplay.nativeElement) {
		// 		this.renderer.setStyle(this.strokeColorPicker.nativeElement, 'visibility', 'visible');
		// 		this.strokePickerOpen = true;
		// 	} else if (this.strokePickerOpen && e.target !== this.strokeColorPicker.nativeElement) {
		// 		this.renderer.setStyle(this.strokeColorPicker.nativeElement, 'visibility', 'hidden');
		// 	}
		// 	if (e.target === this.fillColorDisplay.nativeElement) {
		// 		this.renderer.setStyle(this.fillColorPicker.nativeElement, 'visibility', 'visible');
		// 		this.fillPickerOpen = true;
		// 	} else if (this.fillPickerOpen && e.target !== this.fillColorPicker.nativeElement) {
		// 		this.renderer.setStyle(this.fillColorPicker.nativeElement, 'visibility', 'hidden');
		// 	}
		// });
	}

	toolAction(tool: string): void {}

	// change the currently selected tool
	changeTool(tool: string): void {
		// this.inputSvc.changeTool(this.inputSvc.toolsOptions[tool]);
	}

	updateShape(shape: string): void {
		// this.inputSvc.currentShape = this.inputSvc.shapeOptions[shape];
		// this.inputSvc.changeTool(this.inputSvc.toolsOptions.draw); // activate draw tool on shape change
	}
}
