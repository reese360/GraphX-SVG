import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IShape } from '../Interfaces/IShape.interface';
import { IStyleOptions } from '../interfaces/IStyleOptions';
import { SvgRenderOption } from '../enums/SvgRenderOption.enum';
import { SvgFillOption } from '../enums/SvgFillOption.enum';
import { SvgStrokeOption } from '../enums/SvgStrokeOption.enum';
import { SvgShapeOption } from '../enums/SvgShapeOption.enum';
import { InputToolOption } from '../enums/inputToolOption.enum';
import { IInputOptions } from '../interfaces/IInputOptions.interface';
import { SvgStrokeLinecapOption } from '../enums/SvgStrokeLinecapOption.enum';

@Injectable({
	providedIn: 'root',
})
export class InputService {
	public inputOptions: IInputOptions = {
		tool: InputToolOption.draw,
		shape: SvgShapeOption.path,
	};

	public objectStyleOptions: IStyleOptions = {
		stroke: '#000000ff',
		strokeWidth: 5,
		strokeDasharray: '0',
		shapeRendering: SvgRenderOption.auto,
		strokeType: SvgStrokeOption.solid,
		strokeLinecap: SvgStrokeLinecapOption.butt,
		fill: '#ccccccff',
		fillType: SvgFillOption.solid,
	};

	public canvasViewBoxOptions: object = {
		dimensions: [1000, 800],
		display: 1,
		outline: 1,
		opacity: 2,
		vbRatio: null,
	};

	public gridOptions: object = {
		snap: 0,
		display: 0,
		dimensions: [100, 100],
		offset: [0, 0],
		dimsRatio: null,
		offsetRatio: null,
	};

	public currentObject: IShape = null;
	public currentObjectEvent: Subject<IShape> = new Subject<IShape>();

	public mouseCoords: number[];
	public mouseCoordsEvent: Subject<number[]> = new Subject<number[]>();

	public zoomLevel: number;
	public zoomLevelEvent: Subject<number> = new Subject<number>();

	public inputOptionsEvent: Subject<IInputOptions> = new Subject<IInputOptions>();
	public objectStyleOptionsEvent: Subject<object> = new Subject<object>();
	public canvasViewBoxOptionEvent: Subject<object> = new Subject<object>();
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
	async updateCanvasViewBoxOptions(option: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (option in this.canvasViewBoxOptions) {
				this.canvasViewBoxOptions[option] = value;
				this.canvasViewBoxOptionEvent.next(this.canvasViewBoxOptions);
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
		return new Promise(() => {
			this.mouseCoordsEvent.next(pos);
			this.mouseCoords = pos;
		});
	}

	async updateZoomLevel(level: number): Promise<void> {
		return new Promise(() => {
			this.zoomLevelEvent.next(level);
			this.zoomLevel = level;
		});
	}

	async updateInputToolOptions(tool: InputToolOption): Promise<void> {
		return new Promise(() => {
			this.inputOptions.tool = tool;
			this.inputOptionsEvent.next(this.inputOptions);
		});
	}

	async updateInputShapeOptions(shape: SvgShapeOption): Promise<void> {
		return new Promise(() => {
			this.inputOptions.shape = shape;
			this.inputOptionsEvent.next(this.inputOptions);
		});
	}
}
