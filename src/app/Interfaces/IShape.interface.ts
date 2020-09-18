import { Renderer2 } from '@angular/core';

export interface IShape {
    shape: string;
    id: string;
    element: HTMLElement;
    elementStyle: object;
    renderer: Renderer2;
    origin: number[];
    dragging: boolean;

    render(): void;
    select(): Promise < void > ;
    deselect(): Promise < void > ;
    startDraw(val: number[]): Promise < void > ;
    drawTo(val: number[]): Promise < void > ;
    startDrag(pos: [number, number]): Promise < void > ;
    dragTo(pos: [number, number]): Promise < void > ;
    endDrag(): Promise < void > ;
    setStyle(style: object): Promise < void > ;
}