import { Renderer2 } from '@angular/core';
import { nanoid } from 'nanoid/non-secure';

export class ShapeModel {
    id: string;
    element: HTMLElement;

    constructor(public renderer: Renderer2, public shape: string) {
        this.id = nanoid();
        this.element = this.renderer.createElement(shape, 'svg');
        this.renderer.setAttribute(this.element, 'graphx-id', this.id);
    }
}