import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';

export class EllipseModel extends ShapeModel implements IShape {
	shape: string = 'ellipse';
	element: any;
	renderer: Renderer2;
	x: number;
	y: number;
	rx: number;
	ry: number;
	origin: number[];

	constructor(renderer: Renderer2, public style: any) {
		super();
		this.renderer = renderer;
		this.element = this.renderer.createElement(this.shape, 'svg');
		this.renderer.setAttribute(this.element, 'style', this.styleString);
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'cx', `${this.x}`);
		this.renderer.setAttribute(this.element, 'cy', `${this.y}`);
		this.renderer.setAttribute(this.element, 'rx', `${this.rx}`);
		this.renderer.setAttribute(this.element, 'ry', `${this.ry}`);
	}

	set start(val: number[]) {
		this.origin = [val[0], val[1]];
		this.x = val[0];
		this.y = val[1];
	}

	set end(val: number[]) {
		this.x = Math.min(this.origin[0], val[0]);
		this.y = Math.min(this.origin[1], val[1]);
		this.rx = Math.abs(val[0] - this.origin[0]);
		this.ry = Math.abs(val[1] - this.origin[1]);
		this.render();
	}

	get styleString(): string {
		let style = '';
		Object.keys(this.style).map((key) => {
			style += `${key}: ${this.style[key]}; `;
		});
		return style;
	}
}
