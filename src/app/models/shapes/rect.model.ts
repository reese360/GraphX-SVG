import { IShape } from '../../Interfaces/IShape.interface';
import { ShapeModel } from '../shape.model';
import { Renderer2 } from '@angular/core';

export class RectModel extends ShapeModel implements IShape {
    element: HTMLElement;
    elementStyle: object;
    renderer: Renderer2;
    x: number;
    y: number;
    width: number;
    height: number;
    origin: number[];
    offsetX: number;
    offsetY: number;
    dragging: boolean = false;
    selected: boolean = false;

    constructor(renderer: Renderer2, style: object) {
        super(renderer, 'rect');
        this.setStyle(style);
    }

    // begin draw process
    async startDraw(val: number[]): Promise < void > {
        return new Promise(() => {
            this.origin = [val[0], val[1]];
            this.x = val[0];
            this.y = val[1];
            this.width = val[0];
            this.height = val[1];
        });
    }

    // draw object to position
    async drawTo(val: number[]): Promise < void > {
        return new Promise(() => {
            this.x = Math.min(this.origin[0], val[0]);
            this.y = Math.min(this.origin[1], val[1]);
            this.width = Math.abs(val[0] - this.origin[0]);
            this.height = Math.abs(val[1] - this.origin[1]);
            this.render();
        });
    }

    // select object
    async select(): Promise < void > {
        return new Promise(() => {
            this.selected = true;
            this.renderer.addClass(this.element, 'selectedObject');
        });
    }

    // deselect object
    async deselect(): Promise < void > {
        return new Promise(() => {
            this.selected = false;
            this.renderer.removeClass(this.element, 'selectedObject');
        });
    }

    // begin drag process
    async startDrag(pos): Promise < void > {
        return new Promise(() => {
            this.dragging = true;
            this.offsetX = pos[0] - this.origin[0];
            this.offsetY = pos[1] - this.origin[1];
        });
    }

    // drag object to position
    async dragTo(pos): Promise < void > {
        return new Promise(() => {
            const dx = pos[0] - this.offsetX;
            const dy = pos[1] - this.offsetY;
            this.origin = [dx, dy];
            this.x = dx;
            this.y = dy;
            this.render();
        });
    }

    // end drag process
    async endDrag(): Promise < void > {
        return new Promise(() => {
            this.dragging = false;
            this.offsetX = null;
            this.offsetY = null;
        });
    }

    // update style attributes
    async setStyle(styling: object): Promise < void > {
        this.elementStyle = styling;
        Object.keys(this.elementStyle).forEach(style => {
            this.renderer.setAttribute(this.element, style, this.elementStyle[style]);
        });
    }

    // set positional attributes
    render(): void {
        this.renderer.setAttribute(this.element, 'x', `${this.x}`);
        this.renderer.setAttribute(this.element, 'y', `${this.y}`);
        this.renderer.setAttribute(this.element, 'width', `${this.width}`);
        this.renderer.setAttribute(this.element, 'height', `${this.height}`);
    }
}