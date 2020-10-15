import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IShape } from '../Interfaces/IShape.interface';
import { StyleSetting } from '../common/types/styleSetting.type';
import { CanvasViewBoxSettings } from '../common/types/canvasViewBoxSettings.type';
import { GridSettings } from '../common/types/gridSettings.type';
import { SvgRenderOption } from '../enums/svgRenderOption.enum';
import { SvgFillOption } from '../enums/svgFillOption.enum';
import { SvgStrokeOption } from '../enums/svgStrokeOption.enum';
import { SvgShapeOption } from '../enums/svgShapeOption.enum';
import { InputToolOption } from '../enums/inputToolOption.enum';
import { InputSetting } from '../common/types/inputSetting.type';
import { SvgStrokeLinecapOption } from '../enums/svgStrokeLinecapOption.enum';

@Injectable({
	providedIn: 'root',
})
export class InputService {
	public inputOptions: InputSetting = {
		tool: InputToolOption.draw,
		shape: SvgShapeOption.path,
	};

	public styleOptions: StyleSetting = {
		stroke: '#000000ff',
		strokeWidth: 5,
		strokeDasharray: '0',
		shapeRendering: SvgRenderOption.auto,
		strokeType: SvgStrokeOption.solid,
		strokeLinecap: SvgStrokeLinecapOption.butt,
		fill: '#ccccccff',
		fillType: SvgFillOption.solid,
	};

	public canvasViewBoxOptions: CanvasViewBoxSettings = {
		dimensions: [1000, 800],
		display: 1,
		outline: 1,
		opacity: 2,
		vbRatio: null,
	};

	public gridOptions: GridSettings = {
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

	public inputOptionsEvent: Subject<InputSetting> = new Subject<InputSetting>();
	public styleOptionsEvent: Subject<StyleSetting> = new Subject<StyleSetting>();
	public canvasViewBoxOptionEvent: Subject<CanvasViewBoxSettings> = new Subject<CanvasViewBoxSettings>();
	public gridOptionsEvent: Subject<GridSettings> = new Subject<GridSettings>();

	async updateCurrentObject(obj: IShape): Promise<void> {
		return new Promise(() => {
			this.currentObject = obj;
			if (this.currentObject) {
				this.styleOptions = Object.assign({}, obj.style);
				this.currentObjectEvent.next(this.currentObject);
			}
		});
	}

	// update and broadcast shape style options update
	async updateStyleOptions(style: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (style in this.styleOptions) {
				// check for valid key
				(this.styleOptions as any)[style] = value;
				this.styleOptionsEvent.next(this.styleOptions);
			}
		});
	}
	// update and broadcast canvas options update
	async updateCanvasViewBoxOptions(option: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (option in this.canvasViewBoxOptions) {
				(this.canvasViewBoxOptions as any)[option] = value;
				this.canvasViewBoxOptionEvent.next(this.canvasViewBoxOptions);
			}
		});
	}

	// update and broadcast grid options update
	async updateGridOptions(option: string, value: string | number | boolean | number[]): Promise<void> {
		return new Promise(() => {
			if (option in this.gridOptions) {
				(this.gridOptions as any)[option] = value;
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
