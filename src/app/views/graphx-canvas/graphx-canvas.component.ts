import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { InputService } from 'src/app/services/inputTool.service';
import { SelectionService } from 'src/app/services/selectionTool.service';
import { ObjectService } from 'src/app/services/object.service';
import { SvgRenderOptions } from './../../enums/SvgRenderOptions.enum';
import { SvgFillType } from './../../enums/SvgFillType.enum';
import { SvgStrokeType } from './../../enums/SvgStrokeType.enum';
import { DrawService } from '../../services/draw.service';
import { MouseButtons } from '../../enums/mouseButtons.enum';
import { RectModel } from 'src/app/models/shapes/rect.model';
import { InputToolOptions } from 'src/app/enums/inputTools.enum';

@Component({
	selector: 'app-graphx-canvas',
	templateUrl: './graphx-canvas.component.html',
	styleUrls: ['./graphx-canvas.component.css'],
})
export class GraphxCanvasComponent implements AfterViewInit {
	//#region variable declarations
	@ViewChild('svg') svgElementRef: ElementRef; // reference to svg element in dom
	@ViewChild('svgContainer') scgContainerElementRef: ElementRef; // reference to svg element in dom
	@ViewChild('gridElements') gridElementRef: ElementRef; // elements to display grid
	@ViewChild('canvasElements') canvasElementRef: ElementRef; // elements to be exported as svg
	@ViewChild('selectionElements') selectionElementRef: ElementRef; // used to house elements for selection tool
	@ViewChild('drawElements') drawElementRef: ElementRef;

	// faux svg viewbox == canvas
	// canvas 'display' dimensions
	canvasWidth: number = 1000;
	canvasHeight: number = 800;
	canvasOpacity: string = '1';
	canvasOutline: string = '1';
	canvasDisplay: boolean = true;

	/* 'SVG' refers to the global SVG not the faux 'Canvas' */
	// svg viewBox dimensions
	svgMinX: number = -10;
	svgMinY: number = -10;
	svgWidth: number; // viewBox width
	svgHeight: number; // viewBox height

	offsetX: number; // offset position x of svg element
	offsetY: number; // offset position y of svg element

	// panning variables
	panning: boolean = false;
	panOffsetX: number;
	panOffsetY: number;

	// zoom variables
	zoomIdx: number = 3; // current zoom level (default at 100%)
	zoomLevels: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
	zoomHeight: number;
	zoomWidth: number;

	// gridline variables
	gridDisplay: boolean = false;
	gridSnap: boolean = false;
	gridDimensions: number[] = [100, 100];
	gridOffset: number[] = [0, 0];

	//#endregion

	constructor(private renderer: Renderer2, private inputSvc: InputService, private selectionSvc: SelectionService, private objectSvc: ObjectService, private drawSvc: DrawService) {
		this.initSubscriptions();
	}

	ngAfterViewInit(): void {
		window.dispatchEvent(new Event('resize')); // get initial sizing of svg window

		this.selectionSvc.selectionRect.domRef = this.selectionElementRef; // pass element reference to dom layer

		// assign element references
		this.drawSvc.drawElRef = this.drawElementRef;
		this.drawSvc.canvasElRef = this.canvasElementRef;

		// draw test svg object to canvas
		const testSvg1 = new RectModel(this.renderer, {
			stroke: '#000000ff',
			fill: '#c4c2c2ff',
			strokeWidth: 1,
			strokeDasharray: '0',
			strokeType: SvgStrokeType.solid,
			fillType: SvgFillType.solid,
			shapeRendering: SvgRenderOptions.auto,
		});
		testSvg1.startDraw([400, 300]);
		testSvg1.drawTo([600, 500]);
		this.renderer.appendChild(this.canvasElementRef.nativeElement, testSvg1.element);
		this.objectSvc.add(testSvg1);
	}

	// promise to activate all event listeners
	async initSubscriptions(): Promise<void> {
		return new Promise(() => {
			// gridline options subscription
			this.inputSvc.gridOptionsEvent.subscribe((options) => {
				this.gridDisplay = options['display'];
				this.gridSnap = options['snap'];
				this.gridDimensions = options['dimensions'];
				this.gridOffset = options['offset'];

				// preliminary grid destruction -> display grid if display is enabled
				this.hideGrid().then(() => this.showGrid());
			});

			// viewbox options subscription
			this.inputSvc.canvasViewBoxOptionEvent.subscribe((options) => {
				this.canvasDisplay = options['display'];
				this.canvasWidth = options['dimensions'][0];
				this.canvasHeight = options['dimensions'][1];
				this.canvasOutline = options['outline'].toString();
				this.canvasOpacity = options['opacity'] === 0 ? '0' : options['opacity'] === 1 ? '0.5' : '1';
			});
		});
	}

	// promise to calculate and display grid elements
	async showGrid(): Promise<void> {
		return new Promise((res) => {
			if (!this.gridDisplay) return; // return if display is disabled

			// create template for line with styling
			const lineTemplate = this.renderer.createElement('line', 'svg');
			this.renderer.setAttribute(lineTemplate, 'stroke', 'var(--graphx-highlight1)');
			this.renderer.setAttribute(lineTemplate, 'stroke-width', '1');
			this.renderer.setAttribute(lineTemplate, 'opacity', '0.5');
			this.renderer.setAttribute(lineTemplate, 'shape-rendering', 'crispEdges');

			// horizontal gridlines
			let nextY: number = Math.round(this.svgMinY / this.gridDimensions[1]) * this.gridDimensions[1] + this.gridOffset[1];
			for (let i = 0; i < this.svgHeight / this.gridDimensions[1]; i++) {
				const line = lineTemplate.cloneNode(true);
				this.renderer.setAttribute(line, 'x1', `${this.svgMinX}`);
				this.renderer.setAttribute(line, 'y1', `${nextY}`);
				this.renderer.setAttribute(line, 'x2', `${this.svgWidth + this.svgMinX}`);
				this.renderer.setAttribute(line, 'y2', `${nextY}`);
				this.renderer.appendChild(this.gridElementRef.nativeElement, line);
				nextY += this.gridDimensions[1];
			}

			// vertical gridlines
			let nextX: number = Math.round(this.svgMinX / this.gridDimensions[0]) * this.gridDimensions[0] + this.gridOffset[0];
			for (let i = 0; i < this.svgWidth / this.gridDimensions[0]; i++) {
				const line = lineTemplate.cloneNode(true);
				this.renderer.setAttribute(line, 'x1', `${nextX}`);
				this.renderer.setAttribute(line, 'y1', `${this.svgMinY}`);
				this.renderer.setAttribute(line, 'x2', `${nextX}`);
				this.renderer.setAttribute(line, 'y2', `${this.svgHeight + this.svgMinY}`);
				this.renderer.appendChild(this.gridElementRef.nativeElement, line);
				nextX += this.gridDimensions[0];
			}
			res();
		});
	}

	// promise to hide grid elements
	async hideGrid(): Promise<void> {
		return new Promise((res) => {
			for (const child of this.gridElementRef.nativeElement.children) this.renderer.removeChild(this.gridElementRef.nativeElement, child);
			res();
		});
	}

	// update viewBox for zoom level
	async updateSvgViewBox(defViewBox: string): Promise<void> {
		return new Promise(() => {
			this.renderer.setAttribute(this.svgElementRef.nativeElement, 'viewBox', defViewBox);
		});
	}

	// calculates user mouse position relative to screen/offset/grid-snap
	calculateUserPosition(clientX: number, clientY: number): [number, number] {
		// mouse position relative to screen
		let mouseX = clientX - this.offsetX + this.svgMinX;
		let mouseY = clientY - this.offsetY + this.svgMinY;

		// snap to gridlines if enabled
		if (this.gridSnap) {
			mouseX = Math.round(mouseX / this.gridDimensions[0]) * this.gridDimensions[0] + this.gridOffset[0];
			mouseY = Math.round(mouseY / this.gridDimensions[1]) * this.gridDimensions[1] + this.gridOffset[1];
		}
		return [mouseX, mouseY];
	}

	// mousewheel listener for zoom controls
	@HostListener('mousewheel', ['$event']) scroll(e): void {
		e.preventDefault();
		// ctrl key must be pressed
		if (e.ctrlKey) {
			this.zoomIdx = e.deltaY === 100 ? (this.zoomIdx + 1 < this.zoomLevels.length ? this.zoomIdx + 1 : this.zoomIdx) : this.zoomIdx - 1 > 0 ? this.zoomIdx - 1 : 0; // keeps index within bounds of zoom level array
			this.zoomHeight = this.svgHeight * this.zoomLevels[this.zoomIdx];
			this.zoomWidth = this.svgWidth * this.zoomLevels[this.zoomIdx];
			const defViewBox = `${this.svgMinX} ${this.svgMinY} ${this.zoomWidth} ${this.zoomHeight}`;
			this.inputSvc.updateZoomLevel(this.zoomLevels[this.zoomLevels.length - 1 - this.zoomIdx]); // pass new zoom level to tool
			this.updateSvgViewBox(defViewBox);
		}
	}

	// window resize event handler
	@HostListener('window:resize', ['$event']) resize(e): void {
		// set svg viewBox dimensions
		const containerSize = this.scgContainerElementRef.nativeElement.getBoundingClientRect();
		this.svgWidth = containerSize.width;
		this.svgHeight = containerSize.height;

		// multiplying new dims by zoom level ensures zoom integrity
		this.zoomHeight = this.svgHeight * this.zoomLevels[this.zoomIdx];
		this.zoomWidth = this.svgWidth * this.zoomLevels[this.zoomIdx];
		const defViewBox = `${this.svgMinX} ${this.svgMinY} ${this.zoomWidth} ${this.zoomHeight}`;
		this.updateSvgViewBox(defViewBox);

		// get offset position of svg
		this.offsetX = this.svgElementRef.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.svgElementRef.nativeElement.getBoundingClientRect().y;

		if (this.gridDisplay) this.hideGrid().then((res) => this.showGrid()); // recalculate grid if being displayed
	}

	// mouse down event handler
	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		// left mouse button click
		if (e.button === MouseButtons.left) {
			console.log(this.inputSvc.inputOptions.tool);
			switch (this.inputSvc.inputOptions.tool) {
				case InputToolOptions.select: {
					const hitObjectId = e.target.getAttribute('graphx-id'); // get id of hit object
					const hitObjectRef = this.objectSvc.fetch(hitObjectId);
					if (hitObjectRef) {
						// ctrl key allows additional objects to be selected simultaneously
						if (!e.ctrlKey) if (!this.selectionSvc.isSelected(hitObjectId)) this.selectionSvc.deselect();

						// select object and begin drag process
						this.selectionSvc.select([hitObjectRef]).then(() => {
							this.selectionSvc.startDrag(this.calculateUserPosition(e.clientX, e.clientY));
						});
					} else {
						// if no graphx object -> deselect all -> start selection box
						this.selectionSvc.deselect();
						this.selectionSvc.startSelectionBox(this.calculateUserPosition(e.clientX, e.clientY));
					}
					break;
				}
				case InputToolOptions.draw: {
					this.drawSvc.startDraw(this.calculateUserPosition(e.clientX, e.clientY));
					break;
				}
				case InputToolOptions.pan: {
					this.panning = true;
					break;
				}
			}
		}

		// mousewheel button click
		if (e.button === MouseButtons.middle) {
			this.panning = true;
		}

		// right mouse button click
		if (e.button === MouseButtons.right) {
			e.preventDefault(); // halt default context menu
			this.drawSvc.handleRightClick(); // ends drawing process if
		}

		// start panning functionality
		if (this.panning) {
			this.panOffsetX = e.clientX - this.offsetX;
			this.panOffsetY = e.clientY - this.offsetY;
			this.hideGrid();
		}
	}

	// mouse move event handler
	@HostListener('mousemove', ['$event']) onMouseMove(e): void {
		this.updateMouseCoords([e.clientX - this.offsetX + this.svgMinX, e.clientY - this.offsetY + this.svgMinY]);

		switch (this.inputSvc.inputOptions.tool) {
			case InputToolOptions.select: {
				if (this.selectionSvc.canDragSelected) {
					this.selectionSvc.dragTo(this.calculateUserPosition(e.clientX, e.clientY));
					break;
				}
				if (this.selectionSvc.selecting) {
					this.selectionSvc.drawSelectionBoxTo(this.calculateUserPosition(e.clientX, e.clientY));
					break;
				}
				break;
			}
			case InputToolOptions.draw: {
				this.drawSvc.drawTo(this.calculateUserPosition(e.clientX, e.clientY));
				break;
			}
		}

		// calculate new viewbox position
		if (this.panning) {
			const dx = e.clientX - this.panOffsetX - this.offsetX;
			const dy = e.clientY - this.panOffsetY - this.offsetY;
			const defViewBox = `${this.svgMinX - dx} ${this.svgMinY - dy} ${this.zoomWidth} ${this.zoomHeight}`;
			this.updateSvgViewBox(defViewBox);
		}
	}

	// mouse up event handler
	@HostListener('mouseup', ['$event']) onMouseUp(e): void {
		switch (this.inputSvc.inputOptions.tool) {
			case InputToolOptions.select: {
				if (this.selectionSvc.dragging)
					// end drag process
					this.selectionSvc.endDrag();

				if (this.selectionSvc.selecting)
					// end selection process
					this.selectionSvc.endSelectionBox();

				break;
			}
			case InputToolOptions.draw: {
				if (e.button === MouseButtons.left) this.drawSvc.endDraw(this.calculateUserPosition(e.clientX, e.clientY));
				break;
			}
		}

		if (this.panning) {
			this.panning = false;
			this.svgMinX -= e.clientX - this.panOffsetX - this.offsetX;
			this.svgMinY -= e.clientY - this.panOffsetY - this.offsetY;
			this.panOffsetX = null;
			this.panOffsetY = null;
			if (this.gridDisplay) this.showGrid();
		}
	}

	@HostListener('window:keydown', ['$event']) keyEvent(e: KeyboardEvent): void {
		// console.log(e.key);
	}

	// updates toolService mouse coordinates
	// BUG: does not work correctly at zoom levels != 100%
	updateMouseCoords(pos: [number, number]): void {
		this.inputSvc.updateMouseCoords(pos);
	}
}
