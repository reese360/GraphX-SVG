import { Component, OnInit, ViewChild } from '@angular/core';
import { IOptionSelectorInput, OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { ToolInputService } from 'src/app/services/toolInput.service';

@Component({
    selector: 'app-gridlines',
    templateUrl: './gridlines.component.html',
    styleUrls: ['./gridlines.component.css'],
})
export class GridlinesMenuItemComponent implements OnInit {
    @ViewChild('showGrid') showGrid: OptionSelectorComponent;
    @ViewChild('snapGrid') snapGrid: OptionSelectorComponent;
    @ViewChild('gridWidth') gridWidth: NumberInputComponent;
    @ViewChild('gridHeight') gridHeight: NumberInputComponent;

    isLinked: boolean = true;

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
        minimum: 10,
        maximum: 500,
        step: 10,
        value: 100
    }

    gridHeightData: INumberPickerInput = {
        label: 'Grid Width',
        minimum: 10,
        maximum: 500,
        step: 10,
        value: 100
    }
    //#endregion

    constructor(private toolService: ToolInputService) {}

    ngOnInit(): void {}

    // enable/ disable displaying gridlines
    toggleGridLines(val): void {
        // disable grid snapping if grid display is off
        if (val === 1 && this.snapGrid.selectedIdx !== 1) {
            this.snapGrid.toggleOptions(1);
        }
        this.toolService.toggleGridDisplay();
    }

    // enable/ disable snapping to grid
    toggleSnapGrid(val): void {
        // grid display must be enabled to snap to grid -> toggle grid display
        if (val === 0 && this.showGrid.selectedIdx !== 0)
            this.showGrid.toggleOptions(0);
    }

    updateGridWidth(val): void {
        if (this.isLinked) {
            this.gridHeight.data.value = val;
        }
        this.toolService.updateGridDimensions([val, this.gridHeight.data.value]);
    }

    updateGridHeight(val): void {
        if (this.isLinked) {
            this.gridWidth.data.value = val;
        }
        this.toolService.updateGridDimensions([this.gridWidth.data.value, val]);

    }

    toggleLink(): void {
        this.isLinked = !this.isLinked;
    }
}