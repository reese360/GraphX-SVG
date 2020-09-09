import { Subject } from 'rxjs';

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
    public mouseCoordsEvent: Subject < number[] > = new Subject < number[] > ();

    public zoomLevel: number;
    public zoomLevelEvent: Subject < number > = new Subject < number > ();

    public strokeColor: string;
    public strokeColorEvent: Subject < string > = new Subject < string > ();

    public fillColor: string;
    public fillColorEvent: Subject < string > = new Subject < string > ();

    public strokeSize: number;
    public strokeSizeEvent: Subject < number > = new Subject < number > ();

    public strokeDashArray: string;
    public strokeDashArrayEvent: Subject < string > = new Subject < string > ();

    public currentTool: string;
    public ToolEvent: Subject < string > = new Subject < string > ();

    public currentShape: string;
    public ShapeEvent: Subject < string > = new Subject < string > ();

    public snapGrid: boolean;
    public showGridEvent: Subject < boolean > = new Subject < boolean > ();

    public gridDimensions: number[];
    public gridDimensionsEvent: Subject < number[] > = new Subject < number[] > ();

    public gridSnap: boolean;
    public gridSnapEvent: Subject < boolean > = new Subject < boolean > ();

    async updateMouseCoords(pos: number[]): Promise < void > {
        new Promise(() => {
            this.mouseCoordsEvent.next(pos);
            this.mouseCoords = pos;
        });
    }

    async updateZoomLevel(level: number): Promise < void > {
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

    updateStrokeWidth(size: number): void {
        this.strokeSize = size;
        this.strokeSizeEvent.next(size);
    }

    updateStrokeDash(dashArray: string): void {
        this.strokeDashArray = dashArray;
        this.strokeDashArrayEvent.next(dashArray);
    }

    changeStrokeColor(color: string): void {
        this.strokeColorEvent.next(color);
        this.strokeColor = color;
    }

    changeFillColor(color: string): void {
        this.fillColorEvent.next(color);
        this.fillColor = color;
    }

    async toggleGridDisplay(dispOption: boolean): Promise < void > {
        return new Promise(() => {
            this.snapGrid = dispOption; // toggle grid display
            this.showGridEvent.next(this.snapGrid)
        })
    }

    async toggleGridSnap(snapOption: boolean): Promise < void > {
        return new Promise(() => {
            this.snapGrid = snapOption;
            this.gridSnapEvent.next(this.snapGrid)
        })
    }

    async updateGridDimensions(dims: number[]): Promise < void > {
        return new Promise(() => {
            this.gridDimensionsEvent.next(dims);
            this.gridDimensions = dims;
        })
    }
}