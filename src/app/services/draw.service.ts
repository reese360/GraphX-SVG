import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { InputService } from './inputTool.service';
import { AnchorOutline, AnchorDrawingProperties } from '../models/anchors/AnchorOutline.model';
import { AnchorPoint } from '../models/anchors/anchorPoint.model';
import { RectModel } from './../models/shapes/rect.model';
import { LineModel } from './../models/shapes/line.model';
import { EllipseModel } from './../models/shapes/ellipse.model';
import { PolylineModel } from '../models/shapes/polyline.model';
import { PolygonModel } from '../models/shapes/polygon.model';
import { PathModel } from '../models/shapes/path.model';
import { SvgShapeOption } from '../enums/svgShapeOption.enum';
import { ObjectService } from './object.service';
import { IShape } from '../Interfaces/IShape.interface';
import { render } from 'ngx-color';
import { SvgFillOption } from '../enums/svgFillOption.enum';
import { SvgRenderOption } from '../enums/svgRenderOption.enum';
import { SvgStrokeOption } from '../enums/svgStrokeOption.enum';

@Injectable({
	providedIn: 'root',
})
export class DrawService {
	drawElRef: ElementRef;
	canvasElRef: ElementRef;

	mouseAnchor: AnchorPoint;
	anchorOutline: AnchorOutline;

	drawing: boolean = false;
	shape: IShape;

	constructor(private renderer: Renderer2, private inputSvc: InputService, private objectSvc: ObjectService) {}

	// start outlining user draw
	async startDraw(point: [number, number]): Promise<void> {
		return new Promise(() => {
			if (!this.drawing) this.resetAnchors(); // if user let go of mouse outside of canvas -> remove any anchor remnants

			switch (this.inputSvc.inputOptions.shape) {
				case SvgShapeOption.line:
				case SvgShapeOption.rect:
				case SvgShapeOption.ellipse:
					this.drawing = true;
					this.renderer.appendChild(this.drawElRef.nativeElement, new AnchorPoint(this.renderer, point).element); // starting anchor point
					this.anchorOutline = new AnchorOutline(this.renderer, this.inputSvc.inputOptions.shape, point);
					this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorOutline.element);
					this.mouseAnchor = new AnchorPoint(this.renderer, point);
					this.renderer.appendChild(this.drawElRef.nativeElement, this.mouseAnchor.element);
					break;
				case SvgShapeOption.polygon:
				case SvgShapeOption.polyline:
					if (!this.drawing) {
						// start drawing a polyline | polygon
						this.drawing = true;
						this.renderer.appendChild(this.drawElRef.nativeElement, new AnchorPoint(this.renderer, point).element); // starting anchor point
						this.anchorOutline = new AnchorOutline(this.renderer, this.inputSvc.inputOptions.shape, point);
						this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorOutline.element);
						this.mouseAnchor = new AnchorPoint(this.renderer, point);
						this.renderer.appendChild(this.drawElRef.nativeElement, this.mouseAnchor.element);
					} else {
						// insert anchor point + push point into poly point array
						this.mouseAnchor = new AnchorPoint(this.renderer, point);
						this.renderer.appendChild(this.drawElRef.nativeElement, this.mouseAnchor.element);
						this.anchorOutline.points.push(point[0], point[1]);
						this.mouseAnchor = new AnchorPoint(this.renderer, point);
					}
					break;
				case SvgShapeOption.path:
					this.drawing = true;
					this.renderer.appendChild(this.drawElRef.nativeElement, new AnchorPoint(this.renderer, point).element); // starting anchor point
					this.anchorOutline = new AnchorOutline(this.renderer, this.inputSvc.inputOptions.shape, point);
					this.renderer.appendChild(this.drawElRef.nativeElement, this.anchorOutline.element);
					this.mouseAnchor = new AnchorPoint(this.renderer, point);
					this.renderer.appendChild(this.drawElRef.nativeElement, this.mouseAnchor.element);
					break;
			}
		});
	}

	// draw to user position
	async drawTo(point: [number, number]): Promise<void> {
		return new Promise(() => {
			if (this.drawing) {
				this.anchorOutline.drawTo(point); // move outline to mouse position
				this.mouseAnchor.moveTo(point); // move anchor to mouse position
			}
		});
	}

	// end draw -> remove anchors & render shape
	async endDraw(point: [number, number]): Promise<void> {
		return new Promise(() => {
			switch (this.inputSvc.inputOptions.shape) {
				case SvgShapeOption.rect:
				case SvgShapeOption.line:
				case SvgShapeOption.ellipse:
				case SvgShapeOption.path:
					if (this.drawing) {
						this.drawing = false;
						this.anchorOutline.endDraw(point).then((props) =>
							this.drawShape(props).then(() => {
								this.resetAnchors();
							})
						);
					}
					break;
				case SvgShapeOption.polygon:
				case SvgShapeOption.polyline:
					if (this.drawing) {
						/* poly shapes only end when user right clicks -- continue drawing */
					} else {
						// this is reached only when user right clicks
						this.anchorOutline.endDraw(point).then((props) => {
							this.drawShape(props).then(() => {
								this.resetAnchors();
							});
						});
					}
					break;
			}
		});
	}

	// render shape to canvas
	async drawShape(props: AnchorDrawingProperties): Promise<void> {
		let shape: RectModel | LineModel | EllipseModel | PolylineModel | PathModel;
		switch (this.inputSvc.inputOptions.shape) {
			case SvgShapeOption.line:
			case SvgShapeOption.rect:
			case SvgShapeOption.ellipse:
				// request: make minimum distance a custom setting
				if (Math.sqrt((props.x1 - props.x2) ** 2 + (props.y1 - props.y2) ** 2) <= 10) return;
				return new Promise((res) => {
					switch (props.shape) {
						case SvgShapeOption.rect:
							shape = new RectModel(this.renderer, this.inputSvc.styleOptions);
							break;
						case SvgShapeOption.line:
							shape = new LineModel(this.renderer, this.inputSvc.styleOptions);
							break;
						case SvgShapeOption.ellipse:
							shape = new EllipseModel(this.renderer, this.inputSvc.styleOptions);
							break;
					}
					shape.startDraw([props.x1, props.y1]);
					shape.drawTo([props.x2, props.y2]);
					this.renderer.appendChild(this.canvasElRef.nativeElement, shape.element);
					this.objectSvc.add(shape); // add shape to object service map
					res();
				});
			case SvgShapeOption.polyline:
			case SvgShapeOption.polygon:
				// request: validity check for small poly shapes
				return new Promise((res) => {
					switch (props.shape) {
						case SvgShapeOption.polyline:
							shape = new PolylineModel(this.renderer, this.inputSvc.styleOptions);
							break;
						case SvgShapeOption.polygon:
							shape = new PolygonModel(this.renderer, this.inputSvc.styleOptions);
							break;
					}
					shape.drawTo(props.points);
					this.renderer.appendChild(this.canvasElRef.nativeElement, shape.element);
					this.objectSvc.add(shape); // add shape to object service map
					res();
				});
			case SvgShapeOption.path:
				return new Promise((res) => {
					shape = new PathModel(this.renderer, this.inputSvc.styleOptions);
					// shape.startDraw([spec['points'].shift(), spec['points'].shift()]);
					shape.drawTo(props.points);
					this.renderer.appendChild(this.canvasElRef.nativeElement, shape.element);
					this.objectSvc.add(shape); // add shape to object service map
					res();
				});
		}
	}

	// right click ends drawing process for polygon | polyline
	async handleRightClick(): Promise<void> {
		if (this.drawing) {
			return new Promise(() => {
				// end drawing poly shape
				this.drawing = false;
				this.endDraw([null, null]).then(() => {
					this.resetAnchors();
				});
			});
		}
		this.resetAnchors();
	}

	// clean up any anchors that could be on canvas
	async resetAnchors(): Promise<void> {
		return new Promise((res) => {
			this.anchorOutline = null;
			this.mouseAnchor = null;
			for (const child of this.drawElRef.nativeElement.children) this.renderer.removeChild(this.drawElRef.nativeElement, child);
			res();
		});
	}
}
