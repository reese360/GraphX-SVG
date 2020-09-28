import { Component, OnInit, ViewChild } from '@angular/core';
import { InputNumberComponent, IInputNumberInput} from '../../form-items/input-number/input-number.component';
import { IOptionSelectorInput, OptionSelectorComponent } from '../../form-items/option-selector/option-selector.component';
import { InputService } from 'src/app/services/inputTool.service';

export interface GridlinesComponentState {
	gridWidthData: IInputNumberInput;
	gridHeightData: IInputNumberInput;
	gridOffsetXData: IInputNumberInput;
	gridOffsetYData: IInputNumberInput;
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
	@ViewChild('gridWidth') gridWidth: InputNumberComponent;
	@ViewChild('gridHeight') gridHeight: InputNumberComponent;
	@ViewChild('gridOffsetX') gridOffsetX: InputNumberComponent;
	@ViewChild('gridOffsetY') gridOffsetY: InputNumberComponent;

	gridDisplayOption: number;
	gridSnapOption: number;
	gridWidthOption: number;
	gridHeightOption: number;
	gridOffsetXOption: number;
	gridOffsetYOption: number;

	dimsRatio: number = null;
	offsetRatio: number = null;

	gridWidthData: IInputNumberInput = {
		label: 'Grid Width',
		minimum: 10,
		maximum: 500,
		step: 10,
	};
	gridHeightData: IInputNumberInput = {
		label: 'Grid Height',
		minimum: 10,
		maximum: 500,
		step: 10,
	};
	gridOffsetXData: IInputNumberInput = {
		label: 'Grid X Offset',
		minimum: -9999,
		maximum: 9999,
		step: 1,
	};
	gridOffsetYData: IInputNumberInput = {
		label: 'Grid Y Offset',
		minimum: -9999,
		maximum: 9999,
		step: 1,
	};

	gridDisplayData: IOptionSelectorInput = {
		label: 'Show Grid',
		options: ['Off', 'On'],
	};

	gridSnapData: IOptionSelectorInput = {
		label: 'Snap to Grid',
		options: ['Off', 'On'],
	};

	get isDimsLocked(): boolean {
		return this.dimsRatio !== null;
	}
	get isOffsetLocked(): boolean {
		return this.offsetRatio !== null;
	}

	constructor(private inputSvc: InputService) {
		this.fetchInputServiceData();
	}

	ngOnInit(): void {
		this.fetchInputServiceData();
	}

	fetchInputServiceData(): void {
		this.gridDisplayOption = this.inputSvc.gridOptions['display'];
		this.gridSnapOption = this.inputSvc.gridOptions['snap'];
		this.gridWidthOption = this.inputSvc.gridOptions['dimensions'][0];
		this.gridHeightOption = this.inputSvc.gridOptions['dimensions'][1];
		this.gridOffsetXOption = this.inputSvc.gridOptions['offset'][0];
		this.gridOffsetYOption = this.inputSvc.gridOptions['offset'][1];
		this.dimsRatio = this.inputSvc.gridOptions['dimsRatio'];
		this.offsetRatio = this.inputSvc.gridOptions['offsetRatio'];
	}

	// enable/ disable displaying gridlines
	toggleGridLines(option): void {
		// disable grid snapping if grid display is off
		if (option === 0 && this.gridSnapOption === 1) {
			this.gridSnapOption = 0;
			this.inputSvc.gridOptions['snap'] = 0; // dont fire observable
		}

		this.gridDisplayOption = option;
		this.inputSvc.updateGridOptions('display', option);
	}

	// enable/ disable snapping to grid
	toggleSnapGrid(option: number): void {
		// grid display must be enabled to snap to grid -> toggle grid display
		if (option === 1 && this.gridDisplayOption === 0) {
			this.gridDisplayOption = 1;
			this.inputSvc.gridOptions['display'] = 1; // dont fire observable
		}
		this.gridSnapOption = option;
		this.inputSvc.updateGridOptions('snap', option);
	}

	updateGridWidth(dimWidth: number): void {
		if (this.isDimsLocked) {
			this.gridHeightOption = Math.trunc(dimWidth / this.dimsRatio);
		}

		if (this.gridOffsetXOption > dimWidth) this.gridOffsetX.updateInputValue(dimWidth);

		this.inputSvc.updateGridOptions('dimensions', [dimWidth, this.gridHeightOption]);
		this.gridWidthOption = dimWidth;
	}

	updateGridHeight(dimHeight: number): void {
		// maintain aspect ratio
		if (this.isDimsLocked) {
			this.gridWidthOption = Math.trunc(dimHeight / this.dimsRatio);
		}

		if (this.gridOffsetYOption > dimHeight) this.gridOffsetY.updateInputValue(dimHeight);

		// this.inputSvc.updateGridDimensions([this.gridWidthOption, dimHeight]);
		this.inputSvc.updateGridOptions('dimensions', [this.gridWidthOption, dimHeight]);
		this.gridHeightOption = dimHeight;
	}

	updateOffsetX(offX: number): void {
		// validate offX is within bounds of grid width -> if not set it to 1px below
		if (offX >= this.gridWidthOption) {
			offX = this.gridWidthOption - 1;
			this.gridOffsetXOption = offX;
		} else if (offX <= this.gridWidthOption * -1) {
			offX = this.gridWidthOption * -1 + 1;
			this.gridOffsetXOption = offX;
		} else this.gridOffsetXOption = offX;

		// maintain aspect ratio
		if (this.isOffsetLocked) this.gridOffsetYOption = Math.trunc(offX / this.offsetRatio);

		// this.inputSvc.updateGridOffset([this.gridOffsetXOption, this.gridOffsetYOption]);
		this.inputSvc.updateGridOptions('offset', [this.gridOffsetXOption, this.gridOffsetYOption]);
		this.gridOffsetXOption = offX;
	}

	updateOffsetY(offY: number): void {
		// validate offY is within bounds of grid height -> if not set it to 1px below
		if (offY >= this.gridHeightOption) {
			offY = this.gridHeightOption - 1;
			this.gridOffsetYOption = offY;
		} else if (offY <= this.gridHeightOption * -1) {
			offY = this.gridHeightOption * -1 + 1;
			this.gridOffsetYOption = offY;
		} else this.gridOffsetYOption = offY;

		// maintain aspect ratio
		if (this.isOffsetLocked) this.gridOffsetXOption = Math.trunc(offY / this.offsetRatio);

		// this.inputSvc.updateGridOffset([this.gridOffsetXOption, this.gridOffsetYOption]);
		this.inputSvc.updateGridOptions('offset', [this.gridOffsetXOption, this.gridOffsetYOption]);
		this.gridOffsetYOption = offY;
	}

	toggleLock(lock: string): void {
		if (lock === 'gridDims') {
			if (this.dimsRatio) this.dimsRatio = null;
			else this.dimsRatio = this.gridWidthOption / this.gridHeightOption;
			this.inputSvc.gridOptions['dimsRatio'] = this.dimsRatio;
		}
		if (lock === 'offset') {
			if (this.offsetRatio) this.offsetRatio = null;
			else {
				const tempRatio: number = this.gridOffsetXOption / this.gridOffsetYOption;
				this.offsetRatio = isNaN(tempRatio) ? 1 : tempRatio;
			}
			this.inputSvc.gridOptions['offsetRatio'] = this.offsetRatio;
		}
	}
}
