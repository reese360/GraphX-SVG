export class ToolInputService {
	public shapeOptions: any = {
		line: 0,
		rectangle: 1,
		ellipse: 2,
		polygon: 3,
		polyline: 4,
		path: 5,
	};

	public toolsOptions: any = {
		select: 0,
		draw: 1,
	};

	public currentTool: string;
	public currentShape: string;
	public strokeColor: string;
    public fillColor: string;
    public strokeSize: number;
}
