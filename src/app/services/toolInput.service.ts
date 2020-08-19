import { Observable, Subject } from 'rxjs';

export class ToolInputService {
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

	public mouseCoords: number[];
	public mouseCoordsEvent: Subject<number[]> = new Subject<number[]>();

	public strokeColor: string;
	public strokeColorEvent: Subject<string> = new Subject<string>();

	public fillColor: string;
	public fillColorEvent: Subject<string> = new Subject<string>();

	public strokeSize: number;
	public strokeSizeEvent: Subject<number> = new Subject<number>();

	public currentTool: string;
	public ToolEvent: Subject<string> = new Subject<string>();

	public currentShape: string;
	public ShapeEvent: Subject<string> = new Subject<string>();

	updateMouseCoords(pos: number[]): void {
		this.mouseCoordsEvent.next(pos);
		this.mouseCoords = pos;
	}

	changeTool(tool: string): void {
		this.ToolEvent.next(tool);
		this.currentTool = tool;
	}

	changeShape(shape: string): void {
		this.ShapeEvent.next(shape);
		this.currentShape = shape;
	}

	changeStrokeSize(size: number): void {
		this.strokeSizeEvent.next(size);
		this.strokeSize = size;
	}

	changeStrokeColor(color: string): void {
		this.strokeColorEvent.next(color);
		this.strokeColor = color;
	}

	changeFillColor(color: string): void {
		this.fillColorEvent.next(color);
		this.fillColor = color;
	}
}
