import { Renderer2 } from "@angular/core";

export class AnchorPoint {
	element: HTMLElement;
	x: number;
	y: number;
	width: string = '3';
	height: string = '3';

	constructor(private renderer: Renderer2, point: [number, number]) {
		this.x = point[0] - 1;
		this.y = point[1] - 1;

		this.element = this.renderer.createElement('rect', 'svg');
		this.renderer.setAttribute(this.element, 'x', this.x.toString());
		this.renderer.setAttribute(this.element, 'y', this.y.toString());
		this.renderer.setAttribute(this.element, 'width', this.width);
		this.renderer.setAttribute(this.element, 'height', this.height);
		this.renderer.setAttribute(this.element, 'class', 'anchor-point');
	}

	// move anchor position to user point
	async moveTo(point: [number, number]): Promise<void> {
		return new Promise(() => {
			this.x = point[0] - 1;
			this.y = point[1] - 1;

			this.renderer.setAttribute(this.element, 'x', this.x.toString());
			this.renderer.setAttribute(this.element, 'y', this.y.toString());
		});
	}
}