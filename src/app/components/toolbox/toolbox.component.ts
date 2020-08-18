import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToolInputService } from '../../services/toolInput.service';

@Component({
	selector: 'app-toolbox',
	templateUrl: './toolbox.component.html',
	styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent implements AfterViewInit {
	@ViewChild('scp', { read: ElementRef }) strokeColorPicker: ElementRef;
	@ViewChild('fcp', { read: ElementRef }) fillColorPicker: ElementRef;
	@ViewChild('scpDisplay', { read: ElementRef }) strokeColorDisplay: ElementRef;
	@ViewChild('fcpDisplay', { read: ElementRef }) fillColorDisplay: ElementRef;
	strokePickerOpen: Boolean = false;
	fillPickerOpen: Boolean = false;
	strokeColor: string;
	fillColor: string;

	constructor(public toolService: ToolInputService, public renderer: Renderer2) {
		// set initial tooling options
		this.toolService.currentTool = this.toolService.toolsOptions.select;
		this.toolService.currentShape = this.toolService.shapeOptions.polyline;
		this.toolService.strokeColor = '#000000'; // black
		this.toolService.fillColor = 'none'; // no fill
	}

    ngAfterViewInit(): void {
        // window event listeners to open/close color pickers
		this.renderer.listen('window', 'click', (e: Event) => {
			if (e.target === this.strokeColorDisplay.nativeElement) {
				this.renderer.setStyle(this.strokeColorPicker.nativeElement, 'visibility', 'visible');
				this.strokePickerOpen = true;
			} else if (this.strokePickerOpen && e.target !== this.strokeColorPicker.nativeElement) {
				this.renderer.setStyle(this.strokeColorPicker.nativeElement, 'visibility', 'hidden');
			}

			if (e.target === this.fillColorDisplay.nativeElement) {
				this.renderer.setStyle(this.fillColorPicker.nativeElement, 'visibility', 'visible');
				this.fillPickerOpen = true;
			} else if (this.fillPickerOpen && e.target !== this.fillColorPicker.nativeElement) {
				this.renderer.setStyle(this.fillColorPicker.nativeElement, 'visibility', 'hidden');
			}
		});
	}

	updateTool(tool: string): void {
		this.toolService.currentTool = this.toolService.toolsOptions[tool];
	}

	updateShape(shape: string): void {
		this.toolService.currentShape = this.toolService.shapeOptions[shape];
		this.toolService.currentTool = this.toolService.toolsOptions.draw; // activate draw tool on shape change
	}

	updateColors(event, element: string): void {
		if (event) {
			const colorStr = `rgb(${event.color.rgb.r},${event.color.rgb.g},${event.color.rgb.b},${event.color.rgb.a})`;
			switch (element) {
				case 'scp': {
					this.strokeColor = colorStr;
					this.toolService.strokeColor = colorStr;
					break;
				}
				case 'fcp': {
					this.fillColor = colorStr;
					this.toolService.fillColor = colorStr;
					break;
				}
			}
		} else {
			switch (element) {
				case 'scp': {
					this.strokeColor = 'transparent';
					this.toolService.strokeColor = 'none';
					break;
				}
				case 'fcp': {
					this.fillColor = 'transparent';
					this.toolService.fillColor = 'none';
					break;
				}
			}
		}
	}
}
