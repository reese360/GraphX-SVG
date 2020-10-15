import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';
import { StyleSetting } from '../../common/types/styleSetting.type';
import { SvgFillOption } from '../../enums/svgFillOption.enum';
import { SvgRenderOption } from '../../enums/svgRenderOption.enum';
import { SvgStrokeOption } from '../../enums/svgStrokeOption.enum';

export class EllipseModel extends ShapeModel implements IShape {
	//#region variable declarations
	element: HTMLElement;
	style: StyleSetting;
	renderer: Renderer2;
	cx: number;
	cy: number;
	rx: number;
	ry: number;
	origin: number[];
	offsetX: number;
	offsetY: number;
	dragX: number;
	dragY: number;
	dragging: boolean = false;
	isSelected: boolean = false;

	get properties(): object {
		return {
			position: {
				cx: this.cx,
				cy: this.cy,
				rx: this.rx,
				ry: this.ry,
			},
			style: this.style,
		};
	}
	//#endregion

	constructor(renderer: Renderer2, style: StyleSetting) {
		super(renderer, 'ellipse');
		this.setStyle(style);
	}

	// begin drag process
	async startDrag(pos: number[]): Promise<void> {
		return new Promise(() => {
			this.dragging = true;
			this.offsetX = pos[0];
			this.offsetY = pos[1];
		});
	}

	// drag object to position
	async dragTo(pos: number[]): Promise<void> {
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
			this.cx += this.dragX ? this.dragX : 0;
			this.cy += this.dragY ? this.dragY : 0;
			this.dragX = this.dragY = this.offsetX = this.offsetY = null;
			this.renderer.removeAttribute(this.element, 'style'); // remove style
			this.render();
		});
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
	async startDraw(val: number[]): Promise<void> {
		return new Promise(() => {
			this.origin = [val[0], val[1]];
			this.cx = val[0];
			this.cy = val[1];
		});
	}

	// draw object to position
	async drawTo(val: number[]): Promise<void> {
		return new Promise(() => {
			this.rx = Math.abs(this.origin[0] - val[0]);
			this.ry = Math.abs(this.origin[1] - val[1]);
			this.render();
		});
	}

	// update style attributes
	async setStyle(styling: StyleSetting): Promise<void> {
		this.style = Object.assign({}, styling); // create shallow copy of styling
		for (const [key, value] of Object.entries(this.style)) {
			switch (key as string) {
				case 'fillType':
					switch (this.style.fillType) {
						case SvgFillOption.solid:
							this.renderer.setAttribute(this.element, 'fill', this.style.fill);
							break;
						case SvgFillOption.none:
							this.renderer.setAttribute(this.element, 'fill', 'none');
							break;
					}
					break;
				case 'strokeType':
					switch (this.style.strokeType) {
						case SvgStrokeOption.solid:
							this.renderer.setAttribute(this.element, 'stroke', this.style.stroke);
							break;
						case SvgStrokeOption.none:
							this.renderer.setAttribute(this.element, 'stroke', 'none');
							break;
					}
					break;
				case 'shapeRendering':
					this.renderer.setAttribute(this.element, 'shape-rendering', SvgRenderOption[this.style.shapeRendering]);
					break;
				case 'strokeLinecap':
					break;
				default:
					// convert style options to kabob casing for html styling
					const kabobStyle: string = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(); // html kabob casing
					this.renderer.setAttribute(this.element, kabobStyle, value as string);
					break;
			}
		}
	}

	// set positional attributes
	async render(): Promise<void> {
		return new Promise(() => {
			this.renderer.setAttribute(this.element, 'cx', `${this.cx}`);
			this.renderer.setAttribute(this.element, 'cy', `${this.cy}`);
			this.renderer.setAttribute(this.element, 'rx', `${this.rx}`);
			this.renderer.setAttribute(this.element, 'ry', `${this.ry}`);
		});
	}
}
