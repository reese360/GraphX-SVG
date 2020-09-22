import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { InputService } from 'src/app/services/inputTool.service';
import { SelectionService } from 'src/app/services/selectionTool.service';
import { ObjectService } from 'src/app/services/object.service';
import { IStyleOptions } from 'src/app/interfaces/IStyleOptions';
import { SvgRenderOptions } from './../../enums/SvgRenderOptions.enum';
import { SvgFillType } from './../../enums/SvgFillType.enum';
import { SvgStrokeType } from './../../enums/SvgStrokeType.enum';

import { RectModel } from 'src/app/models/shapes/rect.model';
// import { EllipseModel } from 'src/app/models/shapes/ellipse.model';
// import { PolygonModel } from 'src/app/models/shapes/polygon.model';
// import { LineModel } from 'src/app/models/shapes/line.model';
// import { PolylineModel } from 'src/app/models/shapes/polyline.model';

@Component({
    selector: 'app-graphx-canvas',
    templateUrl: './graphx-canvas.component.html',
    styleUrls: ['./graphx-canvas.component.css']
})
export class GraphxCanvasComponent implements AfterViewInit {
    //#region variable declarations
    @ViewChild('svg') svgElementRef: ElementRef; // reference to svg element in dom
    @ViewChild('svgContainer') scgContainerElementRef: ElementRef; // reference to svg element in dom
    @ViewChild('gridElements') gridElementRef: ElementRef; // elements to display grid
    @ViewChild('canvasElements') canvasElementRef: ElementRef; // elements to be exported as svg
    @ViewChild('selectionElements') selectionElementRef: ElementRef; // used to house elements for selection tool

    // faux svg viewbox == canvas
    // canvas 'display' dimensions
    canvasWidth: number = 1000;
    canvasHeight: number = 800;
    canvasOpacity: string = "1"
    canvasStrokeWidth: string = "1";
    canvasDisplay: boolean = true;

    /* 'SVG' refers to the global SVG not the faux 'Canvas' */
    // svg viewBox dimensions
    svgMinX: number = -10;
    svgMinY: number = -10;
    svgWidth: number; // viewBox width
    svgHeight: number; // viewBox height

    offsetX: number; // offset position x of svg element
    offsetY: number; // offset position y of svg element

    currentObject: IShape; // current shape being drawn

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
    gridLines: HTMLElement[] = []; // container to hold dynamic grid line elements
    gridDisplay: boolean = false;
    gridSnap: boolean = false;
    gridDimensions: number[] = [100, 100];
    gridOffset: number[] = [0, 0];

    //#endregion


    constructor(
        private renderer: Renderer2,
        private inputSvc: InputService,
        private selectionSvc: SelectionService,
        private objectService: ObjectService) {

        this.initSubscriptions();
    }

    ngAfterViewInit(): void {
        window.dispatchEvent(new Event('resize')); // get initial sizing of svg window
        this.selectionSvc.selectionRect.domRef = this.selectionElementRef; // pass element reference to dom layer

        /* preliminary drawing of an svg object */
        /* can be used in future development to load a saved svg */
        // const testSvg1 = new RectModel(this.renderer, {
        //     'stroke': 'gray',
        //     'fill': '#00fff9ff',
        //     'stroke-width': '2',
        //     'stroke-dasharray': '0',
        // });
        // testSvg1.startDraw([400, 350]);
        // testSvg1.drawTo([600, 550]);
        // this.renderer.appendChild(this.canvasElementRef.nativeElement, testSvg1.element);
        // this.objectService.add(testSvg1);

        const svg2Style: IStyleOptions = {
            stroke: 'gray',
            fill: '#ff00ebff',
            strokeWidth: 1,
            strokeDasharray: '0',
            strokeType: SvgStrokeType.solid,
            fillType: SvgFillType.solid,
            shapeRendering: SvgRenderOptions.auto
        }
        const testSvg2 = new RectModel(this.renderer, svg2Style);
        testSvg2.startDraw([400, 100]);
        testSvg2.drawTo([600, 300]);
        this.renderer.appendChild(this.canvasElementRef.nativeElement, testSvg2.element);
        this.objectService.add(testSvg2);

        // const testSvg3 = new PolygonModel(this.renderer, { stroke: 'black', fill: 'pink', 'stroke-width': 2 });
        // testSvg3.points = [800, 100, 900, 300];
        // testSvg3.end = [700, 300];
        // this.renderer.appendChild(this.canvasElementRef.nativeElement, testSvg3.element);
        // this.objectService.add(testSvg3);
    }

    // promise to activate all event listeners
    async initSubscriptions(): Promise < void > {
        return new Promise(() => {
            // gridline options subscription
            this.inputSvc.gridOptionsEvent.subscribe((options) => {
                this.gridDisplay = options['display'];
                this.gridSnap = options['snap'];
                this.gridDimensions = options['dimensions'];
                this.gridOffset = options['offset'];

                if (this.gridDisplay) this.hideGrid().then(() => this.showGrid());
            });

            // viewbox options subscription
            this.inputSvc.canvasOptionsEvent.subscribe((options) => {
                this.canvasDisplay = options['display'];
                this.canvasWidth = options['dimensions'][0];
                this.canvasHeight = options['dimensions'][1];
                this.canvasStrokeWidth = options['outline'].toString();
                this.canvasOpacity = options['opacity'];
            });
        })
    }

    // promise to calculate and display grid elements
    async showGrid(): Promise < void > {
        return new Promise((res) => {
            // create template for line with styling
            const lineTemplate = this.renderer.createElement('line', 'svg');
            this.renderer.setAttribute(lineTemplate, 'stroke', 'var(--graphx-highlight1)');
            this.renderer.setAttribute(lineTemplate, 'stroke-width', '1');
            this.renderer.setAttribute(lineTemplate, 'opacity', '0.5');
            this.renderer.setAttribute(lineTemplate, 'shape-rendering', 'crispEdges');

            // horizontal gridlines
            let nextY: number = (Math.round(this.svgMinY / this.gridDimensions[1]) * this.gridDimensions[1]) + this.gridOffset[1];
            for (let i = 0; i < this.svgHeight / this.gridDimensions[1]; i++) {
                const line = lineTemplate.cloneNode(true);
                this.renderer.setAttribute(line, 'x1', `${this.svgMinX}`);
                this.renderer.setAttribute(line, 'y1', `${nextY}`);
                this.renderer.setAttribute(line, 'x2', `${this.svgWidth + this.svgMinX}`);
                this.renderer.setAttribute(line, 'y2', `${nextY}`);
                this.renderer.appendChild(this.gridElementRef.nativeElement, line);
                this.gridLines.push(line);
                nextY += this.gridDimensions[1];
            }

            // vertical gridlines
            let nextX: number = (Math.round(this.svgMinX / this.gridDimensions[0]) * this.gridDimensions[0]) + this.gridOffset[0];
            for (let i = 0; i < this.svgWidth / this.gridDimensions[0]; i++) {
                const line = lineTemplate.cloneNode(true);
                this.renderer.setAttribute(line, 'x1', `${nextX}`);
                this.renderer.setAttribute(line, 'y1', `${this.svgMinY}`);
                this.renderer.setAttribute(line, 'x2', `${nextX}`);
                this.renderer.setAttribute(line, 'y2', `${this.svgHeight + this.svgMinY}`);
                this.renderer.appendChild(this.gridElementRef.nativeElement, line);
                this.gridLines.push(line);
                nextX += this.gridDimensions[0];
            }
            res();
        });
    }

    // promise to hide grid elements
    async hideGrid(): Promise < void > {
        return new Promise((result) => {
            if (this.gridLines.length) {
                this.gridLines.forEach(line => this.renderer.removeChild(this.svgElementRef.nativeElement, line));
                this.gridLines = [];
            }
            result();
        })
    }

    updateSvgViewBox(defViewBox: string): void {
        this.renderer.setAttribute(this.svgElementRef.nativeElement, 'viewBox', defViewBox);
    }

    // calculates user mouse position relative to screen/offset/grid-snap
    calculateUserPosition(clientX: number, clientY: number): [number, number] {
        // mouse position relative to screen
        let mouseX = clientX - this.offsetX + this.svgMinX;
        let mouseY = clientY - this.offsetY + this.svgMinY;

        // snap to gridlines if enabled
        if (this.gridSnap) {
            mouseX = (Math.round(mouseX / this.gridDimensions[0]) * this.gridDimensions[0]) + this.gridOffset[0];
            mouseY = (Math.round(mouseY / this.gridDimensions[1]) * this.gridDimensions[1]) + this.gridOffset[1];
        }
        return [mouseX, mouseY]
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
            this.inputSvc.updateZoomLevel(this.zoomLevels[(this.zoomLevels.length - 1) - this.zoomIdx]); // pass new zoom level to tool
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

        if (this.gridDisplay)
            this.hideGrid().then((res) => this.showGrid());
    }

    // mouse down event handler
    @HostListener('mousedown', ['$event']) onMouseDown(e): void {
        // left mouse button click
        if (e.button === 0) {
            switch (this.inputSvc.currentTool) {
                case this.inputSvc.toolsOptions.select: {
                    const hitObjectId = e.target.getAttribute('graphx-id'); // get id of hit object
                    const hitObjectRef = this.objectService.fetch(hitObjectId);
                    if (hitObjectRef) {
                        // ctrl key allows additional objects to be selected simultaneously
                        if (!e.ctrlKey)
                            if (!this.selectionSvc.isSelected(hitObjectId))
                                this.selectionSvc.deselect();

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
                case this.inputSvc.toolsOptions.draw: {
                    // get style setting from input tool
                    switch (this.inputSvc.currentShape) {
                        // case this.inputSvc.shapeOptions.line: {
                        //     this.currentObject = new LineModel(this.renderer, this.inputSvc.shapeStyleOptions);
                        //     break;
                        // }
                        case this.inputSvc.shapeOptions.rectangle: {
                            this.currentObject = new RectModel(this.renderer, this.inputSvc.objectStyleOptions);
                            break;
                        }
                        // case this.inputSvc.shapeOptions.ellipse: {
                        //     this.currentObject = new EllipseModel(this.renderer, this.inputSvc.shapeStyleOptions);
                        //     break;
                        // }
                        // case this.inputSvc.shapeOptions.polyline: {
                        //     // if currently drawing do not create new object
                        //     if (!this.currentObject) {
                        //         this.currentObject = new PolylineModel(this.renderer, this.inputSvc.shapeStyleOptions);
                        //     }
                        //     break;
                        // }
                        // case this.inputSvc.shapeOptions.polygon: {
                        //     // if currently drawing do not create new object
                        //     if (!this.currentObject) {
                        //         this.currentObject = new PolygonModel(this.renderer, this.inputSvc.shapeStyleOptions);
                        //     }
                        //     break;
                        // }
                    }
                    const userPosition = this.calculateUserPosition(e.clientX, e.clientY);
                    this.currentObject.startDraw(userPosition);
                    this.renderer.appendChild(this.canvasElementRef.nativeElement, this.currentObject.element);
                    break;
                }
                case this.inputSvc.toolsOptions.pan: {
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
                this.objectService.add(this.currentObject);
                this.currentObject = null;
            }
        }

        if (this.panning) {
            this.panOffsetX = e.clientX - this.offsetX;
            this.panOffsetY = e.clientY - this.offsetY;
            this.hideGrid();
        }
    }

    // mouse move event handler
    @HostListener('mousemove', ['$event']) onMouseMove(e): void {
        this.updateMouseCoords([e.clientX - this.offsetX + this.svgMinX, e.clientY - this.offsetY + this.svgMinY]);

        switch (this.inputSvc.currentTool) {
            case this.inputSvc.toolsOptions.select: {
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
            case this.inputSvc.toolsOptions.draw: {
                if (this.currentObject) {
                    this.currentObject.drawTo(this.calculateUserPosition(e.clientX, e.clientY));
                }
                break;
            }
        }

        if (this.panning) {
            const dx = e.clientX - this.panOffsetX - this.offsetX;
            const dy = e.clientY - this.panOffsetY - this.offsetY;
            const defViewBox = `${this.svgMinX - dx} ${this.svgMinY - dy} ${this.zoomWidth} ${this.zoomHeight}`;
            this.updateSvgViewBox(defViewBox);
        }
    }

    // mouse up event handler
    @HostListener('mouseup', ['$event']) onMouseUp(e): void {
        switch (this.inputSvc.currentTool) {
            case this.inputSvc.toolsOptions.select: {
                if (this.selectionSvc.dragging) // end drag process
                    this.selectionSvc.endDrag();

                if (this.selectionSvc.selecting) // end selection process
                    this.selectionSvc.endSelectionBox();

                break;
            }
            case this.inputSvc.toolsOptions.draw: {
                // do nothing if polyline or polygon
                if (this.inputSvc.currentShape === this.inputSvc.shapeOptions.polyline ||
                    this.inputSvc.currentShape === this.inputSvc.shapeOptions.polygon) {
                    return;
                } else if (this.currentObject) { // end draw for other shapes
                    this.objectService.add(this.currentObject);
                    this.currentObject = null;
                }
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