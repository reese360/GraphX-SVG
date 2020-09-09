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

    isLinked: boolean = true; // toggle for linking/unlinking grid width and height

    //#region form inputs
    gridDisplayData: IOptionSelectorInput = {
        label: 'Show Grid',
        options: ['Off', 'On'],
        default: 0
    }

    snapGridInput: IOptionSelectorInput = {
        label: 'Snap to Grid',
        options: ['Off', 'On'],
        default: 0
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
    toggleGridLines(option): void {
        // disable grid snapping if grid display is off
        if (option === 0 && this.snapGrid.selectedIdx !== 0) {
            this.snapGrid.toggleOptions(0);
        }
        this.toolService.toggleGridDisplay(option);
    }

    // enable/ disable snapping to grid
    toggleSnapGrid(option): void {
        // grid display must be enabled to snap to grid -> toggle grid display
        if (option === 1 && this.showGrid.selectedIdx !== 1)
            this.showGrid.toggleOptions(1);
        this.toolService.toggleGridSnap(option);
    }

    updateGridWidth(dimWidth): void {
        if (this.isLinked) {
            this.gridHeight.data.value = dimWidth;
        }
        this.toolService.updateGridDimensions([dimWidth, this.gridHeight.data.value]);
    }

    updateGridHeight(dimHeight): void {
        if (this.isLinked) {
            this.gridWidth.data.value = dimHeight;
        }
        this.toolService.updateGridDimensions([this.gridWidth.data.value, dimHeight]);

    }

    toggleLink(): void {
        this.isLinked = !this.isLinked;
    }
}