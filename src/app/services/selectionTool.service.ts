import { IShape } from '../Interfaces/IShape.interface';
import { IShapeHashMap } from '../interfaces/IShapeHashMap.interface';
import { Injectable, Renderer2 } from '@angular/core';
import { InputService } from './inputTool.service';
import { SelectionModel } from '../models/select/selection.model';
import { ObjectService } from './object.service';

@Injectable()
export class SelectionService {
	private selectedShapes: IShapeHashMap = {}; // user selected shapes
	public dragging: boolean = false; // is dragging process enabled
	public selecting: boolean = false; // is selecting process enabled
	public selectionRect: SelectionModel;

	constructor(private inputSvc: InputService, private renderer: Renderer2, private objectSvc: ObjectService) {
		this.initSubscriptions();
		this.selectionRect = new SelectionModel(this.renderer);
	}

	// promise to activate all input event listeners
	async initSubscriptions(): Promise<void> {
		return new Promise((result) => {
			// subscribe to any shape style changes
			this.inputSvc.objectStyleOptionsEvent.subscribe((style) => {
				Object.keys(this.selectedShapes).forEach((shape) => {
					this.selectedShapes[shape].setStyle(style);
				});
			});

			// event listener for tool change
			this.inputSvc.ToolEvent.subscribe(() => {
				this.deselect();
			});
		});
	}

	// toggles select outline and adds reference
	async select(shapes: Array<IShape>): Promise<void> {
		return new Promise((result) => {
			shapes.forEach((shape) => {
				this.selectedShapes[shape.id] = shape;
				shape.select();
			});
			if (this.selectedObjectsCount === 1) {
				// pass reference to objects style object for manipulation
				this.inputSvc.updateCurrentObject(this.selectedShapes[Object.keys(this.selectedShapes)[0]]);
			}
			result();
		});
	}

	// promise to remove selected status of all objects and remove reference
	async deselect(): Promise<void> {
		return new Promise((result) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].deselect();
				delete this.selectedShapes[shape]; // remove ref to shape
			});
			if (this.inputSvc.currentObject) this.inputSvc.updateCurrentObject(null); // nullify input tool current object
		});
	}

	// promise to starts drag process
	async startDrag(pos: [number, number]): Promise<void> {
		this.dragging = true;
		return new Promise((result) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].startDrag(pos);
			});
		});
	}

	// promise to sets drag of all selected object to position
	async dragTo(pos: [number, number]): Promise<void> {
		return new Promise((result) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].dragTo(pos);
			});
		});
	}

	// promise to ends drag process
	async endDrag(): Promise<void> {
		this.dragging = false;
		return new Promise((result) => {
			Object.keys(this.selectedShapes).forEach((shape) => {
				this.selectedShapes[shape].endDrag();
			});
		});
	}

	// returns if shape is selected
	isSelected(id: number): boolean {
		return id in this.selectedShapes ? true : false;
	}

	// promise to start selection box drawing
	async startSelectionBox(pos: Array<number>): Promise<void> {
		return new Promise((result) => {
			this.selecting = true;
			this.selectionRect.startDraw(pos);
		});
	}

	// promise to draw selection box to new point
	async drawSelectionBoxTo(pos: Array<number>): Promise<void> {
		return new Promise((result) => {
			this.selectionRect.drawTo(pos);
		});
	}

	// promise to end selection box drawing -> calc items within bounds -> select items
	async endSelectionBox(): Promise<void> {
		this.selecting = false;
		return new Promise((result) => {
			this.selectionRect.endDraw().then((boundingRect) => {
				this.getSelectedItems(boundingRect).then((boundShapes) => {
					this.select(boundShapes);
				});
			});
		});
	}

	// promise to determines which objects are within the select box bounds -> returns array of valid objects
	async getSelectedItems(boundingRect: DOMRect): Promise<IShape[]> {
		const objectMap = this.objectSvc.objects;
		return new Promise((result) => {
			const shapesInBounds: IShape[] = [];
			Object.keys(objectMap).forEach((shape) => {
				const shapeBounds = objectMap[shape].element.getBoundingClientRect();
				if (
					boundingRect.top <= shapeBounds.top &&
					shapeBounds.top <= boundingRect.bottom &&
					boundingRect.top <= shapeBounds.bottom &&
					shapeBounds.bottom <= boundingRect.bottom &&
					boundingRect.left <= shapeBounds.left &&
					shapeBounds.left <= boundingRect.right &&
					boundingRect.left <= shapeBounds.right &&
					shapeBounds.right <= boundingRect.right
				) {
					shapesInBounds.push(objectMap[shape]); // if shape in bounds add to array
				}
			});
			result(shapesInBounds);
		});
	}

	// determines if dragging can occur
	get canDragSelected(): boolean {
		return Object.keys(this.selectedShapes).length > 0 && this.dragging ? true : false;
	}

	// returns a count of how many objects are currently selected
	get selectedObjectsCount(): number {
		return Object.keys(this.selectedShapes).length;
	}
}
