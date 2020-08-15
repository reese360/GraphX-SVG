import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Renderer2 } from '@angular/core';
import { LineModel } from '../../models/shapes/line.model';
import { RectModel } from '../../models/shapes/rect.model';
import { EllipseModel } from '../../models/shapes/ellipse.model';
import { IShape } from 'src/app/Interfaces/IShape.interface';
import { IShapeHashMap } from 'src/app/interfaces/IShapeHashMap.interface';
import { ToolInputService } from 'src/app/services/toolInput.service';

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

	constructor(private renderer: Renderer2, private toolService: ToolInputService) {}

	ngAfterViewInit(): void {
		this.offsetX = this.element.nativeElement.getBoundingClientRect().x;
		this.offsetY = this.element.nativeElement.getBoundingClientRect().y;
	}

	@HostListener('mousedown', ['$event']) onMouseDown(e): void {
		switch (this.toolService.currentShape) {
			case this.toolService.shapeOptions.line: {
				this.currentShape = new LineModel(this.renderer, { stroke: this.toolService.strokeColor, 'stroke-width': 2 });
				break;
			}
			case this.toolService.shapeOptions.rectangle: {
				this.currentShape = new RectModel(this.renderer, { stroke: this.toolService.strokeColor, fill: this.toolService.fillColor, 'stroke-width': 2 });
				break;
			}
			case this.toolService.shapeOptions.ellipse: {
				this.currentShape = new EllipseModel(this.renderer, { stroke: this.toolService.strokeColor, ill: this.toolService.fillColor, 'stroke-width': 2 });
				break;
			}
		}
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
