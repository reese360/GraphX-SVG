import { SvgStrokeOption } from '../enums/SvgStrokeOption.enum';
import { SvgFillOption } from '../enums/SvgFillOption.enum';
import { SvgRenderOption } from '../enums/SvgRenderOption.enum';
import { SvgStrokeLinecapOption } from '../enums/SvgStrokeLinecapOption.enum';

export interface IStyleOptions {
	stroke: string;
	strokeWidth: number;
	strokeDasharray: string;
	strokeType: SvgStrokeOption;
	strokeLinecap: SvgStrokeLinecapOption;

	fill: string;
	fillType: SvgFillOption;

	shapeRendering: SvgRenderOption;
}
