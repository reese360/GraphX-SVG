import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { InputService } from './inputTool.service';
import { AnchorOutline } from '../models/anchors/AnchorOutline.model';
import { AnchorPoint } from '../models/anchors/anchorPoint.model';
import { RectModel } from './../models/shapes/rect.model';
import { LineModel } from './../models/shapes/line.model';
import { EllipseModel } from './../models/shapes/ellipse.model';
import { SvgShapeType } from '../enums/SvgShapeType.enum';
import { ObjectService } from './object.service';

@Injectable({
	providedIn: 'root',
})
export class DrawService {
	anchorA: AnchorPoint;
	anchorB: AnchorPoint;
	anchorOutline: AnchorOutline;
	drawElRef: ElementRef;
	canvasElRef: ElementRef;
	drawing: boolean = false;

	constructor(private renderer: Renderer2, private inputSvc: InputService, private objectSvc: ObjectService) {}

	// start outlining user draw
	async startDraw(point: [number, number]): Promise<void> {
		this.cleanDomRef(); // if user let go of mouse outside of canvas -> remove any anchor remnants
		return new Promise(() => {
			this.drawing = true;

			this.anchorA = new AnchorPoint(this.renderer, point);
			this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorA.element);

			this.anchorB = new AnchorPoint(this.renderer, point);
			this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorB.element);

			this.anchorOutline = new AnchorOutline(this.renderer, this.inputSvc.currentShape, point);
			this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorOutline.element);
		});
	}

	// draw to user position
	async drawTo(point: [number, number]): Promise<void> {
		return new Promise(() => {
			if (this.drawing) {
				this.anchorB.moveTo(point);
				this.anchorOutline.drawTo(point);
			}
		});
	}

	// end draw -> remove anchors & render shape
	async endDraw(pos: [number, number]): Promise<void> {
		if (this.drawing)
			return new Promise(() => {
				this.drawing = false;
				// get specs then render new shape
				this.anchorOutline.endDraw(pos).then((spec) =>
					this.drawShape(spec).then(() => {
						this.renderer.removeChild(this.drawElRef.nativeElement, this.anchorA.element);
						this.renderer.removeChild(this.drawElRef.nativeElement, this.anchorB.element);
						this.renderer.removeChild(this.drawElRef.nativeElement, this.anchorOutline.element);
					})
				);
			});
	}

	// render shape to canvas
	async drawShape(spec: object): Promise<void> {
		let shape: RectModel | LineModel | EllipseModel;
		// calculate distance between anchors - return if too small and likely an error
		// request: make minimum distance a custom setting
		if (Math.sqrt((spec['x1'] - spec['x2']) ** 2 + (spec['y1'] - spec['y2']) ** 2) <= 10) return;
		return new Promise((res) => {
			switch (spec['shape']) {
				case SvgShapeType.rect:
					shape = new RectModel(this.renderer, this.inputSvc.objectStyleOptions);
					break;
				case SvgShapeType.line:
					shape = new LineModel(this.renderer, this.inputSvc.objectStyleOptions);
					break;
				case SvgShapeType.ellipse:
					shape = new EllipseModel(this.renderer, this.inputSvc.objectStyleOptions);
					break;
			}
			shape.startDraw([spec['x1'], spec['y1']]);
			shape.drawTo([spec['x2'], spec['y2']]);
			this.renderer.appendChild(this.canvasElRef.nativeElement, shape.element);
			this.objectSvc.add(shape); // add shape to object service map
			res();
		});
	}

	// clean up any anchors that could be on canvas
	async cleanDomRef(): Promise<void> {
		return new Promise((res) => {
			const childElements = this.drawElRef.nativeElement.children;
			for (const child of childElements) this.renderer.removeChild(this.drawElRef.nativeElement, child);
			res();
		});
	}
}
