import { SvgStrokeType } from '../enums/SvgStrokeType.enum';
import { SvgFillType } from '../enums/SvgFillType.enum';
import { SvgRenderOptions } from '../enums/SvgRenderOptions.enum';
import { SvgStrokeLinecapType } from '../enums/SvgStrokeLinecap.enum';

export interface IStyleOptions {
	stroke: string;
	strokeWidth: number;
	strokeDasharray: string;
	strokeType: SvgStrokeType;
	strokeLinecap: SvgStrokeLinecapType;

	fill: string;
	fillType: SvgFillType;

	shapeRendering: SvgRenderOptions;
}
