import { Renderer2 } from '@angular/core';

export interface IShape {
    shape: string;
    id: string;
	style: { key: string; value: string };
	renderer: Renderer2;
	start: number[];
	end: number[];
	element: any;
    origin: number[];

	render(): void;
}
