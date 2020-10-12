import { IShape } from '../../Interfaces/IShape.interface';
import { IStyleOptions } from '../../interfaces/IStyleOptions';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';
import { SvgStrokeType } from '../../enums/SvgStrokeType.enum';
import { SvgRenderOptions } from '../../enums/SvgRenderOptions.enum';

export class PathModel extends ShapeModel implements IShape {
	//#region variable declarations
	element: HTMLElement;
	style: IStyleOptions;
	renderer: Renderer2;
	points: number[][] = [];
	currentEndPoint: [number, number];
	origin: number[];
	offsetX: number;
	offsetY: number;
	dragX: number;
	dragY: number;
	dragging: boolean = false;
	isSelected: boolean = false;

	// buffer: number[][] = [];
	// bufferSize: number = 20;

	get properties(): object {
		return {
			position: {
				// points: this.points,
			},
			style: this.style,
		};
	}

	tStr = '';
	//#endregion

	constructor(renderer: Renderer2, style: IStyleOptions) {
		super(renderer, 'path');
		this.setStyle(style);
	}

	// select object
	async select(): Promise<void> {
		return new Promise(() => {
			this.isSelected = true;
			this.renderer.addClass(this.element, 'selectedObject');
		});
	}

	// deselect object
	async deselect(): Promise<void> {
		return new Promise(() => {
			this.isSelected = false;
			this.renderer.removeClass(this.element, 'selectedObject');
		});
	}

	// begin draw process
	async startDraw(point: number[]): Promise<void> {
		return new Promise(() => {});
	}

	// draw object to position
	async drawTo(points: number[]): Promise<void> {
		return new Promise(() => {
			for (let i = 0; i < points.length - 1; i += 2) {
				this.points.push([points[i], points[i + 1]]);
				// this.appendToBuffer([points[i], points[i + 1]]);
				// this.updatePath();
			}
			// this.pathStr = this.points.join(' ');
			this.render();
		});

		return new Promise(() => {});
	}

	render(): void {
		this.renderer.setAttribute(this.element, 'd', `M${this.points.join(' ')}`);
	}

	// begin drag process
	async startDrag(pos): Promise<void> {
		return new Promise(() => {
			this.dragging = true;
			this.offsetX = pos[0];
			this.offsetY = pos[1];
		});
	}

	// drag object to position
	async dragTo(pos): Promise<void> {
		return new Promise(() => {
			this.dragX = pos[0] - this.offsetX;
			this.dragY = pos[1] - this.offsetY;
			this.renderer.setAttribute(this.element, 'style', `transform: translate(${this.dragX}px, ${this.dragY}px)`);
		});
	}

	// end drag process
	async endDrag(): Promise<void> {
		return new Promise(() => {
			this.dragging = false;
			this.points.forEach((p) => {
				p[0] += this.dragX ? this.dragX : 0;
				p[1] += this.dragY ? this.dragY : 0;
			});
			this.dragX = this.dragY = this.offsetX = this.offsetY = null;
			this.renderer.removeAttribute(this.element, 'style'); // remove style
			this.render();
		});
	}

	// update style attributes
	async setStyle(styling: IStyleOptions): Promise<void> {
		this.style = Object.assign({}, styling); // create shallow copy of styling
		Object.keys(this.style).forEach((style) => {
			switch (style as string) {
				case 'fillType':
					this.renderer.setAttribute(this.element, 'fill', 'none');
					break;
				case 'strokeType':
					switch (this.style.strokeType) {
						case SvgStrokeType.solid:
							this.renderer.setAttribute(this.element, 'stroke', this.style['stroke']);
							break;
						case SvgStrokeType.none:
							this.renderer.setAttribute(this.element, 'stroke', 'none');
							break;
					}
					break;
				case 'shapeRendering':
					this.renderer.setAttribute(this.element, 'shape-rendering', SvgRenderOptions[this.style['shapeRendering']]);
					break;
				default:
					// convert style options to kabob casing for html styling
					const kabobStyle: string = style.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(); // html kabob casing
					this.renderer.setAttribute(this.element, kabobStyle, this.style[style]);
					break;
			}
		});
	}

	// private async appendToBuffer(pos: number[]): Promise<void> {
	// 	return new Promise((res) => {
	// 		this.buffer.push(pos);
	// 		while (this.buffer.length > this.bufferSize) this.buffer.shift();
	// 		res();
	// 	});
	// }

	// private averagePosition(offset: number): [number, number] {
	// 	const length = this.buffer.length;
	// 	if (length % 2 === 1 || length >= this.bufferSize) {
	// 		let totalX = 0;
	// 		let totalY = 0;
	// 		let pt: number[];
	// 		let i: number;
	// 		let count = 0;
	// 		for (i = offset; i < length; i++) {
	// 			count++;
	// 			pt = this.buffer[i];
	// 			totalX += pt[0];
	// 			totalY += pt[1];
	// 		}
	// 		return [totalX / count, totalY / count];
	// 	}
	// 	return null;
	// }

	// private async updatePath(): Promise<void> {
	// 	return new Promise((res) => {
	// 		let point = this.averagePosition(0);
	// 		if (point) {
	// 			this.pathStr += ` L${point[0]} ${point[1]}`;

	// 			let tempStr = '';
	// 			for (let offset = 1; offset < this.buffer.length; offset++) {
	// 				point = this.averagePosition(offset);
	// 				tempStr += ` L${point[0]} ${point[1]}`;
	// 			}

	// 			// this.renderer.setAttribute(this.element, 'd', this.pathStr + tempStr);
	// 		}
	// 		res();
	// 	});
	// }
}
