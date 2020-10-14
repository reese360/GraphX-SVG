import { SvgStrokeOption } from '../../enums/svgStrokeOption.enum';
import { SvgFillOption } from '../../enums/svgFillOption.enum';
import { SvgRenderOption } from '../../enums/svgRenderOption.enum';
import { SvgStrokeLinecapOption } from '../../enums/svgStrokeLinecapOption.enum';

export type StyleSetting = {
	stroke: string;
	strokeWidth: number;
	strokeDasharray: string;
	strokeType: SvgStrokeOption;
	strokeLinecap: SvgStrokeLinecapOption;

	fill: string;
	fillType: SvgFillOption;

	shapeRendering: SvgRenderOption;
};
