import { ViewBoxComponentState } from '../views/advanced-menu/components/menu-items/viewbox/viewbox.component';
import { GridlinesComponentState } from '../views/advanced-menu/components/menu-items/gridlines/gridlines.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CurrentStateService {
    // consistent variable declarations
    defaultMin: number = -9999;
    defaultMax: number = 9999;
    defaultColor: string = '#000000'

    gridState: GridlinesComponentState = {
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
        dimsRatio: 1,
        isOffsetLocked: false,
        offsetRatio: null
    };

    viewBoxState: ViewBoxComponentState = {
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
        vbDisplayData: {
            label: 'ViewBox',
            options: ['Off', 'On'],
            value: 1,
        },
        vbOutlineData: {
            label: 'ViewBox Outline',
            options: ['Off', 'On'],
            value: 1
        },
        vbOpacityData: {
            label: 'ViewBox Transparency',
            options: ['0%', '50%', '100%'],
            value: 2
        },
        isViewBoxLocked: false,
        viewBoxRatio: null,
    }

    // strokeOptionState: StrokeOptionsComponentState = {
    //     strokeType: {
    //         label: 'Stroke Type',
    //         options: ['Solid', 'None'],
    //         value: 0
    //     },
    //     shapeRender: {
    //         label: 'Shape Rendering',
    //         options: ['Auto', 'Speed', 'Contrast', 'Precision'],
    //         value: 0
    //     },
    //     currentAlpha: 100,
    //     currentColor: this.defaultColor,
    //     currentHue: '#000000',
    //     strokeWidth: {
    //         label: 'Stroke Width',
    //         maximum: 100,
    //         minimum: 1,
    //         step: 1,
    //         value: 1
    //     }
    // }

    // fillOptionState: FillOptionComponentSettings = {
    //     fillType: {
    //         label: 'Fill Type',
    //         options: ['Solid', 'None'],
    //         value: 0
    //     },
    //     currentAlpha: 100,
    //     currentColor: this.defaultColor,
    //     currentHue: this.defaultColor
    // }
}