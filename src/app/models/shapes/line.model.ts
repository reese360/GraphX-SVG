import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';

export class LineModel extends ShapeModel implements IShape {
	shape: string = 'line';
	element: any;
	renderer: Renderer2;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	origin: number[];

	constructor(renderer: Renderer2, public style: any) {
		super();
		this.renderer = renderer;
		this.element = this.renderer.createElement(this.shape, 'svg');
		this.renderer.setAttribute(this.element, 'style', this.styleString);
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'x1', `${this.x1}`);
		this.renderer.setAttribute(this.element, 'y1', `${this.y1}`);
		this.renderer.setAttribute(this.element, 'x2', `${this.x2}`);
		this.renderer.setAttribute(this.element, 'y2', `${this.y2}`);
	}

	set start(val: number[]) {
		this.x1 = val[0];
		this.y1 = val[1];
	}

	set end(val: number[]) {
		this.x2 = val[0];
		this.y2 = val[1];
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
