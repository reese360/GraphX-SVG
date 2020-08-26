import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';

export class PolygonModel extends ShapeModel implements IShape {
	shape: string = 'polygon';
	element: any;
	points: number[] = [];
	origin: number[];
	offsetX: number;
	offsetY: number;
	currentEnd: number[];
	dragging: boolean = false;
	selected: boolean = false;
	dragDx: number;
	dragDy: number;

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
		this.offsetX = pos[0];
		this.offsetY = pos[1];
	}

	drag(pos): void {
		this.dragDx = pos[0] - this.offsetX;
		this.dragDy = pos[1] - this.offsetY;
		this.style['transform'] = `translate(${this.dragDx}px, ${this.dragDy}px)`;
		this.renderer.setAttribute(this.element, 'style', this.styleString);
	}

	async endDrag(): Promise<void> {
		new Promise(() => {
			if (this.dragDx && this.dragDy) {
				for (let p = 0; p < this.points.length; p += 2) {
					this.points[p] += this.dragDx;
					this.points[p + 1] += this.dragDy;
				}
				this.currentEnd = [(this.currentEnd[0] += this.dragDx), (this.currentEnd[1] += this.dragDy)];
				this.dragDx = null;
				this.dragDy = null;
				delete this.style['transform'];
				this.renderer.setAttribute(this.element, 'style', this.styleString);
				this.render();
			}
		});
	}

	select(): void {
		this.selected = true;
		this.renderer.addClass(this.element, 'selectedObject');
	}

	deselect(): void {
		this.selected = false;
		this.renderer.removeClass(this.element, 'selectedObject');
	}

	async updateProperties(): Promise<void> {
		const action = new Promise(() => {
			this.renderer.setAttribute(this.element, 'style', this.styleString);
		});
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

	get elementString(): string {
		return `<${this.shape} />`;
	}
}
