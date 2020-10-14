import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';
import { SvgStrokeOption } from '../../enums/svgStrokeOption.enum';
import { StyleSetting } from '../../common/types/styleSetting.type';
import { SvgRenderOption } from '../../enums/svgRenderOption.enum';
import { SvgStrokeLinecapOption } from 'src/app/enums/svgStrokeLinecapOption.enum';

export class LineModel extends ShapeModel implements IShape {
	//#region variable declarations
	element: HTMLElement;
	style: StyleSetting;
	renderer: Renderer2;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
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
				x1: this.x1,
				x2: this.x2,
				y1: this.y1,
				y2: this.y2,
			},
			style: this.style,
		};
	}
	//#endregion

	constructor(renderer: Renderer2, style: StyleSetting) {
		super(renderer, 'line');
		this.setStyle(style);
	}

	async startDraw(val: number[]): Promise<void> {
		return new Promise(() => {
			this.x1 = val[0];
			this.y1 = val[1];
			this.x2 = val[0];
			this.y2 = val[1];
		});
	}

	// draw object to position
	async drawTo(val: number[]): Promise<void> {
		return new Promise(() => {
			this.x2 = val[0];
			this.y2 = val[1];
			this.render();
		});
	}

	// set positional attributes
	async render(): Promise<void> {
		return new Promise(() => {
			this.renderer.setAttribute(this.element, 'x1', `${this.x1}`);
			this.renderer.setAttribute(this.element, 'y1', `${this.y1}`);
			this.renderer.setAttribute(this.element, 'x2', `${this.x2}`);
			this.renderer.setAttribute(this.element, 'y2', `${this.y2}`);
		});
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
			this.x1 += this.dragX ? this.dragX : 0;
			this.x2 += this.dragX ? this.dragX : 0;
			this.y1 += this.dragY ? this.dragY : 0;
			this.y2 += this.dragY ? this.dragY : 0;
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

	// update style attributes
	async setStyle(styling: StyleSetting): Promise<void> {
		this.style = Object.assign({}, styling); // create shallow copy of styling
		Object.keys(this.style).forEach((style) => {
			switch (style as string) {
				case 'fillType':
					break;
				case 'strokeType':
					switch (this.style.strokeType) {
						case SvgStrokeOption.solid:
							this.renderer.setAttribute(this.element, 'stroke', this.style['stroke']);
							break;
						case SvgStrokeOption.none:
							this.renderer.setAttribute(this.element, 'stroke', 'none');
							break;
					}
					break;
				case 'shapeRendering':
					this.renderer.setAttribute(this.element, 'shape-rendering', SvgRenderOption[this.style['shapeRendering']]);
					break;
				case 'strokeLinecap':
					this.renderer.setAttribute(this.element, 'stroke-linecap', SvgStrokeLinecapOption[this.style['strokeLinecap']]);
					break;
				default:
					// convert style options to kabob casing for html styling
					const kabobStyle: string = style.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(); // html kabob casing
					this.renderer.setAttribute(this.element, kabobStyle, this.style[style]);
					break;
			}
		});
	}
}
