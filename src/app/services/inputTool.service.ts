import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IShape } from '../Interfaces/IShape.interface';
import { IStyleOptions } from '../interfaces/IStyleOptions';
import { SvgRenderOptions } from '../enums/SvgRenderOptions.enum';
import { SvgFillType } from '../enums/SvgFillType.enum';
import { SvgStrokeType } from '../enums/SvgStrokeType.enum';

@Injectable({
	providedIn: 'root',
})
export class InputService {
	public shapeOptions: any = {
		line: 0,
		rectangle: 1,
		ellipse: 2,
		polygon: 3,
		polyline: 4,
		path: 5,
		text: 6,
	};

	public toolsOptions: any = {
		select: 0,
		draw: 1,
		pan: 2,
	};

	public objectStyleOptions: IStyleOptions = {
		stroke: '#000000ff',
		strokeWidth: 1,
		strokeDasharray: '0',
		shapeRendering: SvgRenderOptions.auto,
		strokeType: SvgStrokeType.solid,
		fill: '#ccccccff',
		fillType: SvgFillType.solid,
	};

	public canvasOptions: object = {
		dimensions: [1000, 800],
		display: true,
		outline: true,
		opacity: '1',
	};

	public gridOptions: object = {
		snap: false,
		display: false,
		dimensions: [100, 100],
		offset: [0, 0],
	};

	public currentObject: IShape = null;
	public currentObjectEvent: Subject<IShape> = new Subject<IShape>();

	public mouseCoords: number[];
	public mouseCoordsEvent: Subject<number[]> = new Subject<number[]>();

	public zoomLevel: number;
	public zoomLevelEvent: Subject<number> = new Subject<number>();

	public currentTool: string;
	public ToolEvent: Subject<string> = new Subject<string>();

	public currentShape: string;
	public ShapeEvent: Subject<string> = new Subject<string>();

	public objectStyleOptionsEvent: Subject<object> = new Subject<object>();
	public canvasOptionsEvent: Subject<object> = new Subject<object>();
	public gridOptionsEvent: Subject<object> = new Subject<object>();

	async updateCurrentObject(obj: IShape): Promise<void> {
		return new Promise(() => {
			this.currentObject = obj;
			if (this.currentObject) {
				this.objectStyleOptions = Object.assign({}, obj.style);
				this.currentObjectEvent.next(this.currentObject);
			}
		});
	}

	// update and broadcast shape style options update
	async updateObjectStyleOptions(style: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (style in this.objectStyleOptions) {
				// check for valid key
				this.objectStyleOptions[style] = value;
				this.objectStyleOptionsEvent.next(this.objectStyleOptions);
			}
		});
	}

	// update and broadcast canvas options update
	async updateCanvasOptions(option: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (option in this.canvasOptions) {
				this.canvasOptions[option] = value;
				this.canvasOptionsEvent.next(this.canvasOptions);
			}
		});
	}

	// update and broadcast grid options update
	async updateGridOptions(option: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (option in this.gridOptions) {
				this.gridOptions[option] = value;
				this.gridOptionsEvent.next(this.gridOptions);
			}
		});
	}

	async updateMouseCoords(pos: number[]): Promise<void> {
		new Promise(() => {
			this.mouseCoordsEvent.next(pos);
			this.mouseCoords = pos;
		});
	}

	async updateZoomLevel(level: number): Promise<void> {
		new Promise(() => {
			this.zoomLevelEvent.next(level);
			this.zoomLevel = level;
		});
	}

	changeTool(tool: string): void {
		this.ToolEvent.next(tool);
		this.currentTool = tool;
	}

	changeShape(shape: string): void {
		this.ShapeEvent.next(shape);
		this.currentShape = shape;
	}
}
