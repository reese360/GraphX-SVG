import { IShape } from '../Interfaces/IShape.interface';
import { IShapeHashMap } from '../interfaces/IShapeHashMap.interface';
import { Injectable } from '@angular/core';
import { ToolInputService } from './toolInput.service';

@Injectable()
export class SelectorService {
	private selectedShapes: IShapeHashMap = {}; // user selected shapes
	public dragging: boolean = false;

	constructor(private toolService: ToolInputService) {
		// subscription to stroke width change
		this.toolService.strokeSizeEvent.subscribe((size) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['stroke-width'] = size;
				this.selectedShapes[shape].updateProperties();
			});
		});

		// subscription to stroke color change
		this.toolService.strokeColorEvent.subscribe((color) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['stroke'] = color;
				this.selectedShapes[shape].updateProperties();
			});
		});

		// subscription to fill color change
		this.toolService.fillColorEvent.subscribe((color) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['fill'] = color;
				this.selectedShapes[shape].updateProperties();
			});
        });

        // subscription to stroke dash array change
		this.toolService.strokeDashArrayEvent.subscribe((dash) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].style['stroke-dasharray'] = dash;
				this.selectedShapes[shape].updateProperties();
			});
		});

		// event listener for tool change
		this.toolService.ToolEvent.subscribe(() => {
			this.resetService();
		});
	}

	// toggles select outline and adds reference
	select(shape: IShape): void {
		if (undefined === shape) return;
		if (!this.selectedShapes[shape.id]) {
			this.selectedShapes[shape.id] = shape;
			shape.select();
		}
	}

	// remove selected status of all objects and remove reference
	async deselect(): Promise<void> {
		const action = new Promise(() => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].deselect();
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

	endDrag(): void {
		this.dragging = false;
		Object.keys(this.selectedShapes).forEach((shape) => {
			this.selectedShapes[shape].endDrag();
		});
	}

	// returns if id of shape is selected
	lookup(id: number): boolean {
		return id in this.selectedShapes ? true : false;
    }

	resetService(): void {
		this.deselect();
	}

	// determines if dragging can occur
	get canDragSelection(): boolean {
		return Object.keys(this.selectedShapes).length > 0 && this.dragging ? true : false;
	}
}
