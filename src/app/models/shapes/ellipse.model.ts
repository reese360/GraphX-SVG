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
	offsetX: number;
	offsetY: number;
	origin: number[];
	dragging = false;
	selected: boolean = false;

	constructor(renderer: Renderer2, public style: any) {
		super();
		this.renderer = renderer;
		this.element = this.renderer.createElement(this.shape, 'svg');
		this.renderer.setAttribute(this.element, 'style', this.styleString);
		this.renderer.setAttribute(this.element, 'graphx-id', this.id);
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'cx', `${this.x}`);
		this.renderer.setAttribute(this.element, 'cy', `${this.y}`);
		this.renderer.setAttribute(this.element, 'rx', `${this.rx}`);
		this.renderer.setAttribute(this.element, 'ry', `${this.ry}`);
	}

	startDrag(pos): void {
		this.dragging = true;
		this.offsetX = pos[0] - this.origin[0];
		this.offsetY = pos[1] - this.origin[1];
	}

	drag(pos): void {
		const dx = pos[0] - this.offsetX;
		const dy = pos[1] - this.offsetY;
		this.origin = [dx, dy];
		this.x = dx;
		this.y = dy;
		this.render();
	}

	endDrag(): void {
		this.dragging = false;
		this.offsetX = null;
		this.offsetY = null;
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
		new Promise(() => {
			this.renderer.setAttribute(this.element, 'cx', `${this.x}`);
			this.renderer.setAttribute(this.element, 'cy', `${this.y}`);
			this.renderer.setAttribute(this.element, 'rx', `${this.rx}`);
			this.renderer.setAttribute(this.element, 'ry', `${this.ry}`);
			this.renderer.setAttribute(this.element, 'style', this.styleString);
		});
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

    get elementString(): string {
        return `<${this.shape} />`
    }
}
