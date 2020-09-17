import { ElementRef, Renderer2 } from '@angular/core';

export class SelectionModel {
    element: HTMLElement;
    domRef: ElementRef; // reference to selection layer of canvas
    x: number;
    y: number;
    width: number;
    height: number;
    origin: [number, number];

    constructor(private renderer: Renderer2) {
        this.element = this.renderer.createElement('rect', 'svg');
        this.renderer.setAttribute(this.element, 'stroke', 'var(--graphx-highlight1)');
        this.renderer.setAttribute(this.element, 'stroke-width', '1');
        this.renderer.setAttribute(this.element, 'fill', 'transparent');
        this.renderer.setAttribute(this.element, 'shape-rendering', 'crispEdges');
    }

    // start selection box drawing
    async startDraw(pos: number[]): Promise < void > {
        return new Promise((result) => {
            this.origin = [pos[0], pos[1]];
            this.x = pos[0];
            this.y = pos[1];
            this.width = pos[0];
            this.height = pos[0];
        });
    }

    // draw selection box to new point
    async drawTo(pos: number[]): Promise < void > {
        return new Promise((result) => {
            this.x = Math.min(this.origin[0], pos[0]);
            this.y = Math.min(this.origin[1], pos[1]);
            this.width = Math.abs(pos[0] - this.origin[0]);
            this.height = Math.abs(pos[1] - this.origin[1]);
            this.render();
        });
    }

    // ends rect rendering and returns bounding rect
    async endDraw(): Promise < DOMRect > {
        return new Promise((result) => {
            this.renderer.removeChild(this.domRef.nativeElement, this.element);
            result(this.element.getBoundingClientRect());
        });
    }

    // sets element attributes then renders to dom
    render(): void {
        this.renderer.setAttribute(this.element, 'x', this.x.toString());
        this.renderer.setAttribute(this.element, 'y', this.y.toString());
        this.renderer.setAttribute(this.element, 'width', this.width.toString());
        this.renderer.setAttribute(this.element, 'height', this.height.toString());
        this.renderer.appendChild(this.domRef.nativeElement, this.element); // draw rect
    }
}