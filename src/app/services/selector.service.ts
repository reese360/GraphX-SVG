import { IShape } from '../interfaces/IShape.interface';
import { IShapeHashMap } from '../interfaces/IShapeHashMap.interface';
import { Injectable } from '@angular/core';
import { ToolInputService } from './toolInput.service';

@Injectable()
export class SelectorService {
	private selectedShapes: IShapeHashMap = {};
	public dragging: boolean = false;

	constructor(private toolService: ToolInputService) {
		// event listener for stroke size
		this.toolService.strokeSizeEvent.subscribe((size) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['stroke-width'] = size;
				this.selectedShapes[shape].updateProperties();
			});
		});

		// event listener for stroke color
		this.toolService.strokeColorEvent.subscribe((color) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['stroke'] = color;
				this.selectedShapes[shape].updateProperties();
			});
		});

		// event listener for fill color
		this.toolService.fillColorEvent.subscribe((color) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['fill'] = color;
				this.selectedShapes[shape].updateProperties();
			});
		});
	}

	// toggles select outline and adds reference
	select(shape: IShape): void {
		if (undefined === shape) return;
		if (!this.selectedShapes[shape.id]) {
			this.selectedShapes[shape.id] = shape;
			shape.toggleSelect();
		}
	}

	// remove selected status of all objects and remove reference
	async deselect(): Promise<void> {
		const action = new Promise(() => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].toggleSelect();
				delete this.selectedShapes[shape]; // remove ref to shape
			});
		});
	}

	// starts drag process
	startDrag(pos: [number, number]): void {
		this.dragging = true;
		Object.keys(this.selectedShapes).forEach((shape) => {
			this.selectedShapes[shape].startDrag(pos);
		});
	}

	// sets drag of all selected object to position
	dragTo(pos: [number, number]): void {
		Object.keys(this.selectedShapes).forEach((shape) => {
			this.selectedShapes[shape].drag(pos);
		});
	}

	// returns if id of shape is selected
	lookup(id: number): boolean {
		return id in this.selectedShapes ? true : false;
	}

	// determines if dragging can occur
	get canDrag(): boolean {
		return Object.keys(this.selectedShapes).length > 0 && this.dragging ? true : false;
	}
}
