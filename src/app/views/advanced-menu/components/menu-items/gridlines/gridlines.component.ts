import { Component, OnInit, ViewChild } from '@angular/core';
import { IOptionSelectorInput, OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';
import { INumberPickerInput } from '../../form-items/number-input/number-input.component';

@Component({
    selector: 'app-gridlines',
    templateUrl: './gridlines.component.html',
    styleUrls: ['./gridlines.component.css'],
})
export class GridlinesMenuItemComponent implements OnInit {
    @ViewChild('showGrid') showGrid: OptionSelectorComponent;
    @ViewChild('snapGrid') snapGrid: OptionSelectorComponent;

    //#region form inputs
    gridDisplayData: IOptionSelectorInput = {
        label: 'Show Grid',
        options: ['On', 'Off'],
        default: 1
    }

    snapGridInput: IOptionSelectorInput = {
        label: 'Snap to Grid',
        options: ['On', 'Off'],
        default: 1
    }

    gridWidthData: INumberPickerInput = {
        label: 'Grid Width',
        minimum: 5,
        maximum: 100,
        step: 5,
        value: 25
    }

    gridHeightData: INumberPickerInput = {
        label: 'Grid Width',
        minimum: 5,
        maximum: 100,
        step: 5,
        value: 25
    }
    //#endregion

    ngOnInit(): void {}

    // enable/ disable displaying gridlines
    toggleGridLines(val): void {
        // disable grid snapping if grid display is off
        if (val === 1 && this.snapGrid.selectedIdx !== 1) {
            this.snapGrid.toggleOptions(1);
        }
    }

    // enable/ disable snapping to grid
    toggleSnapGrid(val): void {
        // grid display must be enabled to snap to grid -> toggle grid display
        if (val === 0 && this.showGrid.selectedIdx !== 0)
            this.showGrid.toggleOptions(0);
    }

    updateGridWidth(val): void {
        console.log(val);
    }
    updateGridHeight(val): void {
        console.log(val);
    }
}