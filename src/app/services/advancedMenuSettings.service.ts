import { ViewBoxComponentSettings } from '../views/advanced-menu/components/menu-items/geometry/viewbox.component';
import { GridlinesComponentSettings } from '../views/advanced-menu/components/menu-items/gridlines/gridlines.component';

export class AdvancedMenuSettingsService {

    defaultMin: number = -9999;
    defaultMax: number = 9999;

    gridSettings: GridlinesComponentSettings = {
        gridDisplayData: {
            label: 'Show Grid',
            options: ['Off', 'On'],
            value: 0
        },
        snapGridData: {
            label: 'Snap to Grid',
            options: ['Off', 'On'],
            value: 0
        },
        gridWidthData: {
            label: 'Grid Width',
            minimum: 10,
            maximum: 500,
            step: 10,
            value: 100
        },
        gridHeightData: {
            label: 'Grid Height',
            minimum: 10,
            maximum: 500,
            step: 10,
            value: 100
        },
        gridOffsetXData: {
            label: 'Grid X Offset',
            minimum: this.defaultMin,
            maximum: this.defaultMax,
            step: 1,
            value: 0
        },
        gridOffsetYData: {
            label: 'Grid Y Offset',
            minimum: this.defaultMin,
            maximum: this.defaultMax,
            step: 1,
            value: 0
        },
        isDimsLocked: true,
        isOffsetLocked: false
    };

    geometrySettings: ViewBoxComponentSettings = {
        vbWidthData: {
            label: 'Width',
            minimum: 1,
            maximum: this.defaultMax,
            step: 1,
            value: 1000
        },
        vbHeightData: {
            label: 'Height',
            minimum: 1,
            maximum: this.defaultMax,
            step: 1,
            value: 800
        },
        vbOffsetX: {
            label: 'Offset X',
            minimum: this.defaultMin,
            maximum: this.defaultMax,
            step: 1,
            value: 0
        },
        vbOffsetY: {
            label: 'Offset Y',
            minimum: this.defaultMin,
            maximum: this.defaultMax,
            step: 1,
            value: 0
        },
        isViewBoxLocked: false,
        viewBoxRatio: null,
    }
}