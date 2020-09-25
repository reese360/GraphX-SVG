import { Component, OnInit, ViewChild } from '@angular/core';
import { IOptionSelectorInput, OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { InputService } from 'src/app/services/inputTool.service';
import { CurrentStateService } from 'src/app/services/currentState.service';

export interface GridlinesComponentState {
	gridDisplayData: IOptionSelectorInput;
	snapGridData: IOptionSelectorInput;
	gridWidthData: INumberPickerInput;
	gridHeightData: INumberPickerInput;
	gridOffsetXData: INumberPickerInput;
	gridOffsetYData: INumberPickerInput;
	isDimsLocked: boolean;
	dimsRatio: number;
	isOffsetLocked: boolean;
	offsetRatio: number;
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

	componentState: GridlinesComponentState;

	constructor(private inputSvc: InputService, private stateSvc: CurrentStateService) {}

	ngOnInit(): void {
		this.componentState = this.stateSvc.gridState; // ref menu item settings
	}

	// enable/ disable displaying gridlines
	toggleGridLines(option): void {
		// disable grid snapping if grid display is off
		if (option === 0 && this.snapGrid.data.value !== 0) {
			this.snapGrid.toggleOption(0);
		}
		// this.inputSvc.toggleGridDisplay(option);
		this.inputSvc.updateGridOptions('display', option);
		this.componentState.gridDisplayData.value = option;
	}

	// enable/ disable snapping to grid
	toggleSnapGrid(option): void {
		// grid display must be enabled to snap to grid -> toggle grid display
		if (option === 1 && this.showGrid.data.value !== 1) this.showGrid.toggleOption(1);
		// this.inputSvc.toggleGridSnap(option);
		this.inputSvc.updateGridOptions('snap', option);
		this.componentState.snapGridData.value = option;
	}

	updateGridWidth(dimWidth: number): void {
		if (this.componentState.isDimsLocked) {
			this.gridHeight.data.value = Math.trunc(dimWidth / this.componentState.dimsRatio);
		}

		if (this.gridOffsetX.data.value > dimWidth) this.gridOffsetX.updateInputValue(dimWidth);

		// this.inputSvc.updateGridDimensions([dimWidth, this.gridHeight.data.value]);
		this.inputSvc.updateGridOptions('dimensions', [dimWidth, this.componentState.gridHeightData.value]);
		this.componentState.gridWidthData.value = dimWidth;
	}

	updateGridHeight(dimHeight: number): void {
		// maintain aspect ratio
		if (this.componentState.isDimsLocked) {
			this.gridWidth.data.value = Math.trunc(dimHeight / this.componentState.dimsRatio);
		}

		if (this.gridOffsetY.data.value > dimHeight) this.gridOffsetY.updateInputValue(dimHeight);

		// this.inputSvc.updateGridDimensions([this.gridWidth.data.value, dimHeight]);
		this.inputSvc.updateGridOptions('dimensions', [this.componentState.gridWidthData.value, dimHeight]);
		this.componentState.gridHeightData.value = dimHeight;
	}

	updateOffsetX(offX: number): void {
		// validate offX is within bounds of grid width -> if not set it to 1px below
		if (offX >= this.gridWidth.data.value) {
			offX = this.gridWidth.data.value - 1;
			this.gridOffsetX.data.value = offX;
		} else if (offX <= this.gridWidth.data.value * -1) {
			offX = this.gridWidth.data.value * -1 + 1;
			this.gridOffsetX.data.value = offX;
		} else this.gridOffsetX.data.value = offX;

		// maintain aspect ratio
		if (this.componentState.isOffsetLocked) this.gridOffsetY.data.value = Math.trunc(offX / this.componentState.offsetRatio);

		// this.inputSvc.updateGridOffset([this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
		this.inputSvc.updateGridOptions('offset', [this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
		this.componentState.gridOffsetXData.value = offX;
	}

	updateOffsetY(offY: number): void {
		// validate offY is within bounds of grid height -> if not set it to 1px below
		if (offY >= this.gridHeight.data.value) {
			offY = this.gridHeight.data.value - 1;
			this.gridOffsetY.data.value = offY;
		} else if (offY <= this.gridHeight.data.value * -1) {
			offY = this.gridHeight.data.value * -1 + 1;
			this.gridOffsetY.data.value = offY;
		} else this.gridOffsetY.data.value = offY;

		// maintain aspect ratio
		if (this.componentState.isOffsetLocked) this.gridOffsetX.data.value = Math.trunc(offY / this.componentState.offsetRatio);

		// this.inputSvc.updateGridOffset([this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
		this.inputSvc.updateGridOptions('offset', [this.gridOffsetX.data.value, this.gridOffsetY.data.value]);
		this.componentState.gridOffsetYData.value = offY;
	}

	toggleLock(lock: number): void {
		if (lock === 0) {
			// grid dimensions
			this.componentState.isDimsLocked = !this.componentState.isDimsLocked;
			if (this.componentState.isDimsLocked) this.componentState.dimsRatio = this.componentState.gridWidthData.value / this.componentState.gridHeightData.value;
		} else {
			// grid offset
			this.componentState.isOffsetLocked = !this.componentState.isOffsetLocked;
			if (this.componentState.isOffsetLocked) {
				this.componentState.offsetRatio = this.componentState.gridOffsetXData.value / this.componentState.gridOffsetYData.value;
				this.componentState.offsetRatio = isNaN(this.componentState.offsetRatio) ? 1 : this.componentState.offsetRatio; // divide by zero == 1
			}
		}
	}
}
