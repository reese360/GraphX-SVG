import { GridlinesMenuItemSettings } from '../views/advanced-menu/components/menu-items/gridlines/gridlines.component';

export class AdvancedMenuSettingsService {

    gridSettings: GridlinesMenuItemSettings = {
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
            minimum: -9999,
            maximum: 9999,
            step: 1,
            value: 0
        },
        gridOffsetYData: {
            label: 'Grid Y Offset',
            minimum: -9999,
            maximum: 9999,
            step: 1,
            value: 0
        },
        isDimsLocked: true,
        isOffsetLocked: false
    };
}