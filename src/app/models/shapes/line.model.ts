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
    offsetX: number;
    offsetY: number;
	origin: number[];
	dragging = false;

	constructor(renderer: Renderer2, public style: any) {
		super();
		this.renderer = renderer;
		this.element = this.renderer.createElement(this.shape, 'svg');
		this.renderer.setAttribute(this.element, 'style', this.styleString);
		this.renderer.setAttribute(this.element, 'graphx-id', this.id);
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'x1', `${this.x1}`);
		this.renderer.setAttribute(this.element, 'y1', `${this.y1}`);
		this.renderer.setAttribute(this.element, 'x2', `${this.x2}`);
		this.renderer.setAttribute(this.element, 'y2', `${this.y2}`);
	}

	startDrag(pos): void {
		this.dragging = true;
		const offsetX = pos[0] - this.origin[0];
		const offsetY = pos[1] - this.origin[1];
	}

	drag(pos): void {}

	endDrag(): void {
		this.dragging = false;
		this.offsetX = null;
		this.offsetY = null;
    }

    toggleSelect(): void { }
    updateProperties(): void{}


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
