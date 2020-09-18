import { Component, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';

@Component({
    selector: 'app-simple-menu',
    templateUrl: './simple-menu.component.html',
    styleUrls: ['./simple-menu.component.css']
})
export class SimpleMenuComponent implements AfterViewInit {
    // @ViewChild('scp', { read: ElementRef }) strokeColorPicker: ElementRef;
    // @ViewChild('fcp', { read: ElementRef }) fillColorPicker: ElementRef;
    // @ViewChild('scpDisplay', { read: ElementRef }) strokeColorDisplay: ElementRef;
    // @ViewChild('fcpDisplay', { read: ElementRef }) fillColorDisplay: ElementRef;

    strokePickerOpen: boolean = false;
    fillPickerOpen: boolean = false;
    strokeColor: string;
    fillColor: string;

    zoomLevelDisplay: string = '100%';
    mouseX: number = 0;
    mouseY: number = 0;

    strokeWidthOptions: string[][] = [
        ['0', '15', '100', '15', 'stroke-width: 2; stroke-linecap: square;', '2'],
        ['0', '15', '100', '15', 'stroke-width: 4; stroke-linecap: square;', '4'],
        ['0', '15', '100', '15', 'stroke-width: 6; stroke-linecap: square;', '6'],
        ['0', '15', '100', '15', 'stroke-width: 10; stroke-linecap: square;', '10'],
        ['0', '15', '100', '15', 'stroke-width: 14; stroke-linecap: square;', '14'],
        ['0', '15', '100', '15', 'stroke-width: 20; stroke-linecap: round;', '20'],
    ];

    dashArrayOptions: string[][] = [
        ['0', '15', '100', '15', 'stroke-width: 2; stroke-dasharray: none', 'none'],
        ['0', '15', '100', '15', 'stroke-width: 2; stroke-dasharray: 1', '1'],
        ['0', '15', '100', '15', 'stroke-width: 2; stroke-dasharray: 2;', '2'],
        ['0', '15', '100', '15', 'stroke-width: 2; stroke-dasharray: 4;', '4'],
    ];

    constructor(public inputSvc: InputService, public renderer: Renderer2) {
        // set initial tooling options
        this.inputSvc.currentTool = this.inputSvc.toolsOptions.select;
        this.inputSvc.currentShape = this.inputSvc.shapeOptions.polyline;
        // this.inputSvc.strokeColor = '#000'; // black
        // this.inputSvc.fillColor = 'none'; // no fill

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

    toolAction(button: string) {}

    // change the currently selected tool
    changeTool(tool: string): void {
        this.inputSvc.changeTool(this.inputSvc.toolsOptions[tool]);
    }

    updateStrokeStyle(style: string, selection: string): void {
        switch (style) {
            case 'stroke-width': {
                this.inputSvc.updateStrokeWidth(Number(selection));
                break;
            }
            case 'stroke-dasharray': {
                this.inputSvc.updateStrokeDash(selection);
                break;
            }
        }
    }

    updateShape(shape: string): void {
        this.inputSvc.currentShape = this.inputSvc.shapeOptions[shape];
        this.inputSvc.changeTool(this.inputSvc.toolsOptions.draw); // activate draw tool on shape change
    }

    // updateColors(event, element: string): void {
    // 	if (event) {
    // 		const colorStr = `rgb(${event.color.rgb.r},${event.color.rgb.g},${event.color.rgb.b},${event.color.rgb.a})`;
    // 		switch (element) {
    // 			case 'scp': {
    // 				this.strokeColor = colorStr;
    // 				this.toolService.changeStrokeColor(colorStr);
    // 				break;
    // 			}
    // 			case 'fcp': {
    // 				this.fillColor = colorStr;
    // 				this.toolService.changeFillColor(colorStr);
    // 				break;
    // 			}
    // 		}
    // 	} else {
    // 		switch (element) {
    // 			case 'scp': {
    // 				this.strokeColor = 'transparent';
    // 				this.toolService.changeStrokeColor('none');
    // 				break;
    // 			}
    // 			case 'fcp': {
    // 				this.fillColor = 'transparent';
    // 				this.toolService.changeFillColor('none');

    // 				break;
    // 			}
    // 		}
    // 	}
    // }
}