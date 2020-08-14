import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { LineModel } from '../../models/shapes/line.model';
import { RectModel } from '../../models/shapes/rect.model';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { IShapeHashMap } from 'src/app/Interfaces/IShapeHashMap.interface';

@Component({
	selector: 'app-canvas',
	// templateUrl: './canvas.component.html',
	template: `<svg #svgCanvas></svg>`,
	styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements AfterViewInit {
	@ViewChild('svgCanvas') element: ElementRef; // reference to svg element in dom
	offsetX: number; // offset position x of svg element
	offsetY: number; // offset position y of svg element
	currentShape: IShape; // current shape being drawn
	shapes: IShapeHashMap = {}; // hash map to hold refs to shape objects

	constructor(private renderer: Renderer2) {
		console.log(this.shapes);
	}

	ngAfterViewInit(): void {
		this.offsetX = this.element.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.element.nativeElement.getBoundingClientRect().y;
	}

	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		// tslint:disable-next-line: object-literal-key-quotes
		this.currentShape = new RectModel(this.renderer, { stroke: 'black', fill: 'none', 'stroke-width': 2 });
		// tslint:disable-next-line: object-literal-key-quotes
		// this.currentShape = new LineModel(this.renderer, { stroke: 'black', 'stroke-width': 2 });
		this.currentShape.start = [e.clientX - this.offsetX, e.clientY - this.offsetY];
		this.currentShape.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
		this.renderer.appendChild(this.element.nativeElement, this.currentShape.element);
	}

	@HostListener('mousemove', ['$event']) onMouseMove(e): void {
		if (this.currentShape) {
			this.currentShape.end = [e.clientX - this.offsetX, e.clientY - this.offsetY];
		}
	}

	@HostListener('mouseup', ['$event']) onMouseUp(e): void {
		this.shapes[this.currentShape.id] = this.currentShape;
		this.currentShape = null;
	}
}
