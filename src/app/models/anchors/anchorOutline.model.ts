import { Renderer2 } from '@angular/core';
import { SvgShapeType } from '../../enums/SvgShapeType.enum';

export class AnchorOutline {
	element: HTMLElement;
	x: number;
	y: number;
	width: number;
	height: number;
	origin: [number, number] = [null, null]; // store point of origin

	constructor(private renderer: Renderer2, private shape: SvgShapeType, point: [number, number]) {
		this.x = this.width = this.origin[0] = point[0];
		this.y = this.height = this.origin[1] = point[1];
		this.element = this.renderer.createElement(SvgShapeType[shape], 'svg');
		this.renderer.setAttribute(this.element, 'class', 'anchor-outline');
	}

	// draw anchor to user point
	async drawTo(point: [number, number]): Promise<void> {
		return new Promise(() => {
			switch (this.shape) {
				case SvgShapeType.rect:
					this.x = Math.min(this.origin[0], point[0]);
					this.y = Math.min(this.origin[1], point[1]);
					this.width = Math.abs(point[0] - this.origin[0]);
					this.height = Math.abs(point[1] - this.origin[1]);
					this.renderer.setAttribute(this.element, 'x', this.x.toString());
					this.renderer.setAttribute(this.element, 'y', this.y.toString());
					this.renderer.setAttribute(this.element, 'width', this.width.toString());
					this.renderer.setAttribute(this.element, 'height', this.height.toString());
					break;
				case SvgShapeType.line:
					this.width = point[0];
					this.height = point[1];
					this.renderer.setAttribute(this.element, 'x1', this.x.toString());
					this.renderer.setAttribute(this.element, 'y1', this.y.toString());
					this.renderer.setAttribute(this.element, 'x2', this.width.toString());
					this.renderer.setAttribute(this.element, 'y2', this.height.toString());
					break;
				case SvgShapeType.ellipse:
					this.width = Math.abs(this.origin[0] - point[0]);
					this.height = Math.abs(this.origin[1] - point[1]);
					this.renderer.setAttribute(this.element, 'cx', this.x.toString());
					this.renderer.setAttribute(this.element, 'cy', this.y.toString());
					this.renderer.setAttribute(this.element, 'rx', this.width.toString());
					this.renderer.setAttribute(this.element, 'ry', this.height.toString());
					break;
			}
		});
	}

	// get anchor outline specifications
	async endDraw(pos: [number, number]): Promise<object> {
		return new Promise((specs) => {
			specs({
				shape: this.shape,
				x1: this.origin[0],
				y1: this.origin[1],
				x2: pos[0],
				y2: pos[1],
			});
		});
	}
}
