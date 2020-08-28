import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { IShapeHashMap } from 'src/app/interfaces/IShapeHashMap.interface';
import { ToolInputService } from 'src/app/services/toolInput.service';
import { SelectorService } from 'src/app/services/selector.service';
import { ObjectService } from 'src/app/services/object.service';
import { EllipseModel } from 'src/app/models/shapes/ellipse.model';
import { RectModel } from 'src/app/models/shapes/rect.model';
import { PolygonModel } from 'src/app/models/shapes/polygon.model';
import { LineModel } from 'src/app/models/shapes/line.model';
import { PolylineModel } from 'src/app/models/shapes/polyline.model';

@Component({
  selector: 'app-graphx-canvas',
  templateUrl: './graphx-canvas.component.html',
  styleUrls: ['./graphx-canvas.component.css']
})
export class GraphxCanvasComponent  implements AfterViewInit {
	@ViewChild('svg') svgElementRef: ElementRef; // reference to svg element in dom
	@ViewChild('svgContainer') scgContainerElementRef: ElementRef; // reference to svg element in dom
	@ViewChild('svgCanvas') svgCanvasElementRef: ElementRef;
	width: number = 1000; // width of svg canvas
	height: number = 800; // height of svg canvas

	vbX: number = -10;
	vbY: number = -10;
	vbWidth: number; // viewBox width
	vbHeight: number; // viewBox height

	offsetX: number; // offset position x of svg element
	offsetY: number; // offset position y of svg element
	currentObject: IShape; // current shape being drawn
	shapes: IShapeHashMap = {}; // TODO: remove this for object service's map

	// canvasOffsetX: number = 0;
	// canvasOffsetY: number = 0;

	panning: boolean = false;
	panOffsetX: number;
	panOffsetY: number;

	zoomIdx: number = 3; // current zoom level (default at 100%)
	zoomLevels: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
	zoomHeight: number;
	zoomWidth: number;

	constructor(private renderer: Renderer2, private toolService: ToolInputService, private selectorService: SelectorService, private objectService: ObjectService) {}

	ngAfterViewInit(): void {
		window.dispatchEvent(new Event('resize')); // get initial sizing of svg window

		/* preliminary drawing of an svg object */
		/* can be used in future development to load a saved svg */
		const testSvg1 = new EllipseModel(this.renderer, { stroke: 'black', fill: 'lightblue', 'stroke-width': 2 });
		testSvg1.start = [200, 200];
		testSvg1.end = [300, 300];
		this.renderer.appendChild(this.svgElementRef.nativeElement, testSvg1.element);
		this.objectService.add(testSvg1);

		const testSvg2 = new RectModel(this.renderer, { stroke: 'black', fill: 'lightgreen', 'stroke-width': 2 });
		testSvg2.start = [400, 100];
		testSvg2.end = [600, 300];
		this.renderer.appendChild(this.svgElementRef.nativeElement, testSvg2.element);
		this.objectService.add(testSvg2);

		const testSvg3 = new PolygonModel(this.renderer, { stroke: 'black', fill: 'pink', 'stroke-width': 2 });
		testSvg3.points = [800, 100, 900, 300];
		testSvg3.end = [700, 300];
		this.renderer.appendChild(this.svgElementRef.nativeElement, testSvg3.element);
		this.objectService.add(testSvg3);
	}

	updateSvgViewBox(defViewBox: string): void {
		this.renderer.setAttribute(this.svgElementRef.nativeElement, 'viewBox', defViewBox);
	}

	// mousewheel listener for zoom controls
	@HostListener('mousewheel', ['$event']) scroll(e): void {
		e.preventDefault();
		// ctrl key must be pressed
		if (e.ctrlKey) {
			this.zoomIdx = e.deltaY === 100 ? (this.zoomIdx + 1 < this.zoomLevels.length ? this.zoomIdx + 1 : this.zoomIdx) : this.zoomIdx - 1 > 0 ? this.zoomIdx - 1 : 0; // keeps index within bounds of zoom level array
			this.zoomHeight = this.vbHeight * this.zoomLevels[this.zoomIdx];
			this.zoomWidth = this.vbWidth * this.zoomLevels[this.zoomIdx];
			const defViewBox = `${this.vbX} ${this.vbY} ${this.zoomWidth} ${this.zoomHeight}`;
			this.toolService.updateZoomLevel(this.zoomLevels[(this.zoomLevels.length - 1) - this.zoomIdx]); // pass new zoom level to tool
			this.updateSvgViewBox(defViewBox);
		}
	}

	// window resize event handler
	@HostListener('window:resize', ['$event']) resize(e): void {
		// set svg viewBox dimensions
		const containerSize = this.scgContainerElementRef.nativeElement.getBoundingClientRect();
		this.vbWidth = containerSize.width;
		this.vbHeight = containerSize.height;

		// multiplying new dims by zoom level ensures zoom integrity
		this.zoomHeight = this.vbHeight * this.zoomLevels[this.zoomIdx];
		this.zoomWidth = this.vbWidth * this.zoomLevels[this.zoomIdx];
		const defViewBox = `${this.vbX} ${this.vbY} ${this.zoomWidth} ${this.zoomHeight}`;
		this.updateSvgViewBox(defViewBox);

		// get offset position of svg
		this.offsetX = this.svgElementRef.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.svgElementRef.nativeElement.getBoundingClientRect().y;
	}

	// mouse down event handler
	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		// left mouse button click
		if (e.button === 0) {
			switch (this.toolService.currentTool) {
				case this.toolService.toolsOptions.select: {
					const hitObjectId = e.target.getAttribute('graphx-id'); // get id of hit object
					const hitObjectRef = this.objectService.fetch(hitObjectId);
					if (hitObjectRef) {
						if (e.ctrlKey) {
							// ctrl key allows multiple selected objects
							this.selectorService.select(hitObjectRef);
							this.selectorService.startDrag([e.clientX, e.clientY]);
						} else {
							// verify if object is already selected
							if (!this.selectorService.lookup(hitObjectId)) {
								this.selectorService.deselect();
							}
							this.selectorService.select(hitObjectRef);
							this.selectorService.startDrag([e.clientX, e.clientY]);
						}
					} else {
						// if no graphx object -> deselect all
						this.selectorService.deselect();
					}
					break;
				}
				case this.toolService.toolsOptions.draw: {
					this.selectorService.resetService();
					const styleSettings = {
						stroke: this.toolService.strokeColor,
						'stroke-width': this.toolService.strokeSize,
						'stroke-dasharray': this.toolService.strokeDashArray,
						fill: this.toolService.fillColor,
					};
					switch (this.toolService.currentShape) {
						case this.toolService.shapeOptions.line: {
							this.currentObject = new LineModel(this.renderer, { stroke: this.toolService.strokeColor, 'stroke-width': this.toolService.strokeSize });
							break;
						}
						case this.toolService.shapeOptions.rectangle: {
							this.currentObject = new RectModel(this.renderer, styleSettings);
							break;
						}
						case this.toolService.shapeOptions.ellipse: {
							this.currentObject = new EllipseModel(this.renderer, styleSettings);
							break;
						}
						case this.toolService.shapeOptions.polyline: {
							if (!this.currentObject) {
								// if currently drawing do not create new object
								this.currentObject = new PolylineModel(this.renderer, styleSettings);
							}
							break;
						}
						case this.toolService.shapeOptions.polygon: {
							if (!this.currentObject) {
								// if currently drawing do not create new object
								this.currentObject = new PolygonModel(this.renderer, styleSettings);
							}
							break;
						}
					}
					this.currentObject.start = [e.clientX - this.offsetX + this.vbX, e.clientY - this.offsetY + this.vbY];
					this.currentObject.end = [e.clientX - this.offsetX + this.vbX, e.clientY - this.offsetY + this.vbY];
					this.renderer.appendChild(this.svgElementRef.nativeElement, this.currentObject.element);
					break;
				}
				case this.toolService.toolsOptions.pan: {
					this.panning = true;
					break;
				}
			}
		}

		// mousewheel button click
		if (e.button === 1) {
			this.panning = true;
		}

		// right mouse button click
		if (e.button === 2) {
			e.preventDefault(); // halt default context menu
			if (this.currentObject) {
				this.shapes[this.currentObject.id] = this.currentObject;
				this.currentObject = null;
			}
		}

		if (this.panning) {
			this.panOffsetX = e.clientX - this.offsetX;
			this.panOffsetY = e.clientY - this.offsetY;
		}
	}

	// mouse move event handler
	@HostListener('mousemove', ['$event']) onMouseMove(e): void {
		this.updateMouseCoords([e.clientX - this.offsetX + this.vbX, e.clientY - this.offsetY + this.vbY]);

		switch (this.toolService.currentTool) {
			case this.toolService.toolsOptions.select: {
				if (this.selectorService.canDragSelection) {
					this.selectorService.dragTo([e.clientX, e.clientY]);
				}
				break;
			}
			case this.toolService.toolsOptions.draw: {
				if (this.currentObject) {
					this.currentObject.end = [e.clientX - this.offsetX + this.vbX, e.clientY - this.offsetY + this.vbY];
				}
				break;
			}
		}

		if (this.panning) {
			const dx = e.clientX - this.panOffsetX - this.offsetX;
			const dy = e.clientY - this.panOffsetY - this.offsetY;
			const defViewBox = `${this.vbX - dx} ${this.vbY - dy} ${this.zoomWidth} ${this.zoomHeight}`;
			this.updateSvgViewBox(defViewBox);
		}
	}

	// mouse up event handler
	@HostListener('mouseup', ['$event']) onMouseUp(e): void {
		switch (this.toolService.currentTool) {
			case this.toolService.toolsOptions.select: {
				this.selectorService.endDrag();
				break;
			}
			case this.toolService.toolsOptions.draw: {
				if (this.toolService.currentShape === this.toolService.shapeOptions.polyline || this.toolService.currentShape === this.toolService.shapeOptions.polygon) {
					return;
				}
				if (this.currentObject) {
					this.shapes[this.currentObject.id] = this.currentObject;
					this.currentObject = null;
				}
				break;
			}
		}

		if (this.panning) {
			this.panning = false;
			this.vbX -= e.clientX - this.panOffsetX - this.offsetX;
			this.vbY -= e.clientY - this.panOffsetY - this.offsetY;
			this.panOffsetX = null;
			this.panOffsetY = null;
		}
	}

	@HostListener('window:keydown', ['$event']) keyEvent(e: KeyboardEvent): void {
		// console.log(e.key);
	}

	// updates toolservice mouse coordinates
	updateMouseCoords(pos: [number, number]): void {
		this.toolService.updateMouseCoords(pos);
	}
}