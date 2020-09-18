import { Subject } from 'rxjs';

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

    public shapeStyleOptions: object = {
        'stroke': '#000',
        'fill': '#000',
        'stroke-width': '2',
        'stroke-dasharray': '0',
    };

    public canvasOptions: object = {
        'dimensions': [1000, 800],
        'display': true,
        'outline': true,
        'opacity': '1',
    };

    public gridOptions: object = {
        'snap': false,
        'display': false,
        'dimensions': [100, 100],
        'offset': [0, 0]
    }

    public mouseCoords: number[];
    public mouseCoordsEvent: Subject < number[] > = new Subject < number[] > ();

    public zoomLevel: number;
    public zoomLevelEvent: Subject < number > = new Subject < number > ();

    public currentTool: string;
    public ToolEvent: Subject < string > = new Subject < string > ();

    public currentShape: string;
    public ShapeEvent: Subject < string > = new Subject < string > ();

    public shapeStyleOptionsEvent: Subject < object > = new Subject < object > ();
    public canvasOptionsEvent: Subject < object > = new Subject < object > ();
    public gridOptionsEvent: Subject < object > = new Subject < object > ();

    // update and broadcast shape style options update
    async updateShapeStyleOptions(style: string, value: string): Promise < void > {
        return new Promise(() => {
            this.shapeStyleOptions[style] = value;
            this.shapeStyleOptionsEvent.next(this.shapeStyleOptions)
        });
    }

    // update and broadcast canvas options update
    async updateCanvasOptions(option: string, value: string | number | boolean | number[]): Promise < void > {
        return new Promise(() => {
            this.canvasOptions[option] = value;
            this.canvasOptionsEvent.next(this.canvasOptions);
        });
    }

    // update and broadcast grid options update
    async updateGridOptions(option: string, value: string | number | boolean | number[]): Promise < void > {
        return new Promise(() => {
            this.gridOptions[option] = value;
            this.gridOptionsEvent.next(this.gridOptions);
        })
    }

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
}