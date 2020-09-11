import { Component, OnInit, ViewChild } from '@angular/core';
import { IOptionSelectorInput, OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { ToolInputService } from 'src/app/services/toolInput.service';
import { AdvancedMenuSettingsService } from 'src/app/services/advancedMenuSettings.service';

export interface GridlinesComponentSettings {
    gridDisplayData: IOptionSelectorInput,
        snapGridData: IOptionSelectorInput,
        gridWidthData: INumberPickerInput,
        gridHeightData: INumberPickerInput,
        gridOffsetXData: INumberPickerInput,
        gridOffsetYData: INumberPickerInput,
        isDimsLocked: boolean,
        dimsRatio: number,
        isOffsetLocked: boolean
    offsetRatio: number
}

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
    @ViewChild('gridOffsetX') gridOffsetX: NumberInputComponent;
    @ViewChild('gridOffsetY') gridOffsetY: NumberInputComponent;

    componentSettings: GridlinesComponentSettings;

    constructor(private toolService: ToolInputService, private settingsService: AdvancedMenuSettingsService) {}

    ngOnInit(): void {
        this.componentSettings = this.settingsService.gridSettings; // ref menu item settings
    }

    // enable/ disable displaying gridlines
    toggleGridLines(option): void {
        // disable grid snapping if grid display is off
        if (option === 0 && this.snapGrid.selectedIdx !== 0) {
            this.snapGrid.toggleOptions(0);
        }
        this.toolService.toggleGridDisplay(option);
        this.componentSettings.gridDisplayData.value = option;
    }

    // enable/ disable snapping to grid
    toggleSnapGrid(option): void {
        // grid display must be enabled to snap to grid -> toggle grid display
        if (option === 1 && this.showGrid.selectedIdx !== 1)
            this.showGrid.toggleOptions(1);
        this.toolService.toggleGridSnap(option);
        this.componentSettings.snapGridData.value = option;
    }

    updateGridWidth(dimWidth: number): void {
        if (this.componentSettings.isDimsLocked) {
            this.gridHeight.data.value = Math.trunc(dimWidth / this.componentSettings.dimsRatio);
        }

        if (this.gridOffsetX.data.value > dimWidth)
            this.gridOffsetX.updateInputValue(dimWidth);

        this.toolService.updateGridDimensions([dimWidth, this.gridHeight.data.value]);
        this.componentSettings.gridWidthData.value = dimWidth;
    }

    updateGridHeight(dimHeight: number): void {
        // maintain aspect ratio
        if (this.componentSettings.isDimsLocked) {
            this.gridWidth.data.value = Math.trunc(dimHeight / this.componentSettings.dimsRatio);
        }

        if (this.gridOffsetY.data.value > dimHeight)
            this.gridOffsetY.updateInputValue(dimHeight);

        this.toolService.updateGridDimensions([this.gridWidth.data.value, dimHeight]);
        this.componentSettings.gridWidthData.value = dimHeight;
    }

    updateOffsetX(offX: number): void {
        // validate offX is within bounds of grid width -> if not set it to 1px below
        if (offX >= this.gridWidth.data.value) {
            offX = this.gridWidth.data.value - 1
            this.gridOffsetX.data.value = offX;
        } else if (offX <= (this.gridWidth.data.value * -1)) {
            offX = (this.gridWidth.data.value * -1) + 1
            this.gridOffsetX.data.value = offX;
        } else
            this.gridOffsetX.data.value = offX;

        // maintain aspect ratio
        if (this.componentSettings.isOffsetLocked)
            this.gridOffsetY.data.value = Math.trunc(offX / this.componentSettings.offsetRatio);

        this.toolService.updateGridOffset([this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
        this.componentSettings.gridOffsetXData.value = offX;
    }

    updateOffsetY(offY: number): void {
        // validate offY is within bounds of grid height -> if not set it to 1px below
        if (offY >= this.gridHeight.data.value) {
            offY = this.gridHeight.data.value - 1
            this.gridOffsetY.data.value = offY;
        } else if (offY <= (this.gridHeight.data.value * -1)) {
            offY = (this.gridHeight.data.value * -1) + 1
            this.gridOffsetY.data.value = offY;
        } else
            this.gridOffsetY.data.value = offY;

        // maintain aspect ratio
        if (this.componentSettings.isOffsetLocked)
            this.gridOffsetX.data.value = Math.trunc(offY / this.componentSettings.offsetRatio);

        this.toolService.updateGridOffset([this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
        this.componentSettings.gridOffsetYData.value = offY;
    }

    toggleLock(lock: number): void {
        if (lock === 0) { // grid dimensions
            this.componentSettings.isDimsLocked = !this.componentSettings.isDimsLocked;
            if (this.componentSettings.isDimsLocked)
                this.componentSettings.dimsRatio = this.componentSettings.gridWidthData.value / this.componentSettings.gridHeightData.value;

        } else { // grid offset
            this.componentSettings.isOffsetLocked = !this.componentSettings.isOffsetLocked;
            if (this.componentSettings.isOffsetLocked) {
                this.componentSettings.offsetRatio = this.componentSettings.gridOffsetXData.value / this.componentSettings.gridOffsetYData.value;
                this.componentSettings.offsetRatio = isNaN(this.componentSettings.offsetRatio) ? 1 : this.componentSettings.offsetRatio; // divide by zero == 1
            }
        }
    }
}