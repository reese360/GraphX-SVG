import { SvgShapeType } from '../enums/SvgShapeType.enum';
import { InputToolOptions } from '../enums/inputTools.enum';


export interface IInputOptions {
	tool: InputToolOptions;
	shape: SvgShapeType;
}