import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';

export class PolygonModel extends ShapeModel implements IShape {
	shape: string = 'polygon';
	element: any;
	points: number[] = [];
	origin: number[];
	currentEnd: number[];
	dragging: boolean = false;
	selected: boolean = false;

	constructor(public renderer: Renderer2, public style: any) {
		super();
		this.renderer = renderer;
		this.element = this.renderer.createElement(this.shape, 'svg');
		this.renderer.setAttribute(this.element, 'style', this.styleString);
		this.renderer.setAttribute(this.element, 'graphx-id', this.id);
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'points', this.pointString + `${this.currentEnd[0]},${this.currentEnd[1]}`);
	}

	startDrag(pos): void {
		this.dragging = true;
	}

	drag(pos): void {
		this.render();
	}

	endDrag(): void {
		this.dragging = false;
	}

	toggleSelect(): void {
		this.selected = !this.selected;
		if (this.selected) this.renderer.addClass(this.element, 'selectedObject');
		else this.renderer.removeClass(this.element, 'selectedObject');
	}

	set start(val: number[]) {
		this.points.push(val[0]);
		this.points.push(val[1]);
	}

	set end(val: number[]) {
		this.currentEnd = val;
		this.render();
	}

	get styleString(): string {
		let style = '';
		Object.keys(this.style).map((key) => {
			style += `${key}: ${this.style[key]}; `;
		});
		return style;
	}

	get pointString(): string {
		let ps = '';
		for (let point in this.points) {
			ps += `${this.points[point]}, `;
		}
		return ps;
	}
}
