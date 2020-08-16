import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { LineModel } from '../../models/shapes/line.model';
import { RectModel } from '../../models/shapes/rect.model';
import { EllipseModel } from '../../models/shapes/ellipse.model';
import { PolylineModel } from '../../models/shapes/polyline.model';
import { PolygonModel } from '../../models/shapes/polygon.model';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { IShapeHashMap } from 'src/app/interfaces/IShapeHashMap.interface';
import { ToolInputService } from 'src/app/services/toolInput.service';

@Component({
	selector: 'app-canvas',
	template: `<svg #svgCanvas (contextmenu)="onMouseDown($event)"></svg>`,
	styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
	@ViewChild('svgCanvas') element: ElementRef; // reference to svg element in dom
	offsetX: number; // offset position x of svg element
	offsetY: number; // offset position y of svg element
	currentObject: IShape; // current shape being drawn
	shapes: IShapeHashMap = {}; // hash map to hold refs to shape objects
	clickTimeout: number = 200; // time between clicks to determine single or double

	constructor(private renderer: Renderer2, private toolService: ToolInputService) {}

	ngAfterViewInit(): void {
		// get element offset
		this.offsetX = this.element.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.element.nativeElement.getBoundingClientRect().y;

		// ! preliminary drawing of an svg object
		// ! can be used in future development to load a saved svg
		const testSvg = new RectModel(this.renderer, { stroke: 'black', fill: 'lightgray', 'stroke-width': 2 });
		testSvg.start = [400, 100];
		testSvg.end = [600, 300];
		this.renderer.appendChild(this.element.nativeElement, testSvg.element);
		this.shapes[testSvg.id] = testSvg;
	}

	// window resize event handler
	@HostListener('window:resize', ['$event']) resize(e): void {
		// reset element offset
		this.offsetX = this.element.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.element.nativeElement.getBoundingClientRect().y;
	}

	// mouse down event handler
	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		// left mouse button click
		if (e.button === 0) {
			switch (this.toolService.currentTool) {
				case this.toolService.toolsOptions.select: {
					if (this.currentObject) {
						this.currentObject.toggleSelect();
						this.currentObject = null;
					}
					const hitObject = document.querySelectorAll(':hover');
					const hitObjectId = hitObject.item(hitObject.length - 1).getAttribute('graphx-id');
					this.currentObject = this.shapes[hitObjectId];
					if (this.currentObject) {
						this.currentObject.toggleSelect();
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
						case this.toolService.shapeOptions.polyline: {
							if (!this.currentObject) {
								// if currently drawing do not create new object
								this.currentObject = new PolylineModel(this.renderer, { stroke: this.toolService.strokeColor, fill: 'none', 'stroke-width': 2 });
							}
							break;
						}
						case this.toolService.shapeOptions.polygon: {
							if (!this.currentObject) {
								// if currently drawing do not create new object
								this.currentObject = new PolygonModel(this.renderer, { stroke: this.toolService.strokeColor, fill: this.toolService.fillColor, 'stroke-width': 2 });
							}
							break;
						}
					}
					this.currentObject.start = [e.clientX - this.offsetX, e.clientY - this.offsetY];
					this.currentObject.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
					this.renderer.appendChild(this.element.nativeElement, this.currentObject.element);
					break;
				}
			}
			return;
		}

		// right mouse button click
		if (e.button === 2) {
			e.preventDefault(); // halt default context menu
			if (this.currentObject) {
				this.shapes[this.currentObject.id] = this.currentObject;
				this.currentObject = null;
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
					// special handling for polyline
					if (this.toolService.currentShape === this.toolService.shapeOptions.polyline) {
						this.currentObject.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
					} else {
						this.currentObject.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
					}
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
				if (this.toolService.currentShape === this.toolService.shapeOptions.polyline || this.toolService.currentShape === this.toolService.shapeOptions.polygon) {
					return;
				}
				if (this.currentObject) {
					this.shapes[this.currentObject.id] = this.currentObject;
					this.currentObject = null;
					break;
				}
			}
		}
	}
}
