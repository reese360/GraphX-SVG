import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvancedMenuSettingsService } from 'src/app/services/advancedMenuSettings.service';
import { ToolInputService } from 'src/app/services/toolInput.service';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';

export interface ViewBoxComponentSettings {
    vbWidthData: INumberPickerInput,
        vbHeightData: INumberPickerInput,
        vbOffsetX: INumberPickerInput,
        vbOffsetY: INumberPickerInput,
        isViewBoxLocked: boolean,
        viewBoxRatio: number;
}

@Component({
    selector: 'app-viewbox',
    templateUrl: './viewbox.component.html',
    styleUrls: ['./viewbox.component.css']
})
export class ViewBoxComponent implements OnInit {
    @ViewChild('vbWidth') vbWidth: NumberInputComponent;
    @ViewChild('vbHeight') vbHeight: NumberInputComponent;

    componentSettings: ViewBoxComponentSettings;

    constructor(private toolService: ToolInputService, private settingsService: AdvancedMenuSettingsService) {}

    ngOnInit(): void {
        this.componentSettings = this.settingsService.geometrySettings;
    }

    updateViewBoxWidth(width): void {
        if (this.componentSettings.isViewBoxLocked)
            this.vbHeight.data.value = Math.trunc(width / this.componentSettings.viewBoxRatio);

        this.toolService.updateViewBoxDimensions([width, this.vbHeight.data.value]);
        this.componentSettings.vbWidthData.value = width;
    }

    updateViewBoxHeight(height): void {
        if (this.componentSettings.isViewBoxLocked)
            this.vbWidth.data.value = Math.trunc(height * this.componentSettings.viewBoxRatio);


        this.toolService.updateViewBoxDimensions([this.vbWidth.data.value, height]);
        this.componentSettings.vbHeightData.value = height;
    }

    updateViewBoxOffsetX(offX): void {}
    updateViewBoxOffsetY(offY): void {}

    toggleLock(): void {
        this.componentSettings.isViewBoxLocked = !this.componentSettings.isViewBoxLocked;
        if (this.componentSettings.isViewBoxLocked)
            this.componentSettings.viewBoxRatio = this.componentSettings.vbWidthData.value / this.componentSettings.vbHeightData.value;
    }
}