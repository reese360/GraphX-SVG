import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { LineModel } from '../../models/shapes/line.model';
import { RectModel } from '../../models/shapes/rect.model';
import { EllipseModel } from '../../models/shapes/ellipse.model';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { IShapeHashMap } from 'src/app/interfaces/IShapeHashMap.interface';
import { ToolInputService } from 'src/app/services/toolInput.service';

@Component({
	selector: 'app-canvas',
	template: `<svg #svgCanvas></svg>`,
	styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
	@ViewChild('svgCanvas') element: ElementRef; // reference to svg element in dom
	offsetX: number; // offset position x of svg element
	offsetY: number; // offset position y of svg element
	currentObject: IShape; // current shape being drawn
	shapes: IShapeHashMap = {}; // hash map to hold refs to shape objects

	constructor(private renderer: Renderer2, private toolService: ToolInputService) {}

	ngAfterViewInit(): void {
		this.offsetX = this.element.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.element.nativeElement.getBoundingClientRect().y;

		const testSvg = new RectModel(this.renderer, { stroke: 'black', fill: 'lightgray', 'stroke-width': 2 });
		testSvg.start = [400, 100];
		testSvg.end = [600, 300];
		this.renderer.appendChild(this.element.nativeElement, testSvg.element);
		this.shapes[testSvg.id] = testSvg;
	}

	// mouse down event handler
	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		switch (this.toolService.currentTool) {
			case this.toolService.toolsOptions.select: {
				const hitObject = document.querySelectorAll(':hover');
				const hitObjectId = hitObject.item(hitObject.length - 1).getAttribute('graphx-id');
				this.currentObject = this.shapes[hitObjectId];
				if (this.currentObject) {
					this.currentObject.startDrag([e.clientX, e.clientY]);
				}
				break;
			}
			case this.toolService.toolsOptions.draw: {
				switch (this.toolService.currentShape) {
					case this.toolService.shapeOptions.line: {
						this.currentObject = new LineModel(this.renderer, { stroke: this.toolService.strokeColor, 'stroke-width': 2 });
						break;
					}
					case this.toolService.shapeOptions.rectangle: {
						this.currentObject = new RectModel(this.renderer, { stroke: this.toolService.strokeColor, fill: this.toolService.fillColor, 'stroke-width': 2 });
						break;
					}
					case this.toolService.shapeOptions.ellipse: {
						this.currentObject = new EllipseModel(this.renderer, { stroke: this.toolService.strokeColor, fill: this.toolService.fillColor, 'stroke-width': 2 });
						break;
					}
				}
				this.currentObject.start = [e.clientX - this.offsetX, e.clientY - this.offsetY];
				this.currentObject.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
				this.renderer.appendChild(this.element.nativeElement, this.currentObject.element);
				break;
			}
		}
	}

	// mouse move event handler
	@HostListener('mousemove', ['$event']) onMouseMove(e): void {
		switch (this.toolService.currentTool) {
			case this.toolService.toolsOptions.select: {
				if (this.currentObject && this.currentObject.dragging) {
					this.currentObject.drag([e.clientX, e.clientY]);
				}
				break;
			}
			case this.toolService.toolsOptions.draw: {
				if (this.currentObject) {
					this.currentObject.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
				}
				break;
			}
		}
	}

	// mouse up event handler
	@HostListener('mouseup', ['$event']) onMouseUp(e): void {
		switch (this.toolService.currentTool) {
			case this.toolService.toolsOptions.select: {
				if (this.currentObject && this.currentObject.dragging) {
					this.currentObject.endDrag();
				}
				break;
			}
			case this.toolService.toolsOptions.draw: {
				this.shapes[this.currentObject.id] = this.currentObject;
				this.currentObject = null;
				break;
			}
		}
	}
}
