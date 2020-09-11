import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvancedMenuSettingsService } from 'src/app/services/advancedMenuSettings.service';
import { ToolInputService } from 'src/app/services/toolInput.service';
import { INumberPickerInput, NumberInputComponent } from '../../form-items/number-input/number-input.component';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface ViewBoxComponentSettings {
    vbWidthData: INumberPickerInput,
        vbHeightData: INumberPickerInput,
        vbDisplayData: IOptionSelectorInput,
        vbOutlineData: IOptionSelectorInput,
        vbOpacityData: IOptionSelectorInput,
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
        this.componentSettings = this.settingsService.viewBoxSettings;
    }

    // modifies viewbox width
    updateViewBoxWidth(width): void {
        if (this.componentSettings.isViewBoxLocked)
            this.vbHeight.data.value = Math.trunc(width / this.componentSettings.viewBoxRatio);

        this.toolService.updateViewBoxDimensions([width, this.vbHeight.data.value]);
        this.componentSettings.vbWidthData.value = width;
    }

    // modifies viewbox height
    updateViewBoxHeight(height): void {
        if (this.componentSettings.isViewBoxLocked)
            this.vbWidth.data.value = Math.trunc(height * this.componentSettings.viewBoxRatio);


        this.toolService.updateViewBoxDimensions([this.vbWidth.data.value, height]);
        this.componentSettings.vbHeightData.value = height;
    }

    // toggles aspect ratio lock
    toggleLock(): void {
        this.componentSettings.isViewBoxLocked = !this.componentSettings.isViewBoxLocked;
        if (this.componentSettings.isViewBoxLocked)
            this.componentSettings.viewBoxRatio = this.componentSettings.vbWidthData.value / this.componentSettings.vbHeightData.value;
    }

    // turns on/off viewbox canvas
    toggleViewBox(option): void {
        this.componentSettings.vbDisplayData.value = option;
        this.toolService.toggleViewBox(option);
    }

    // turns on/off viewbox outline
    toggleViewBoxOutline(option): void {
        this.componentSettings.vbOutlineData.value = option;
        this.toolService.toggleViewBoxOutline(option);
    }

    // turns on/off viewbox outline
    toggleViewBoxOpacity(option): void {
        const optionValue = option === 0 ? 0 : option === 1 ? .5 : 1; // convert to numeric value
        this.componentSettings.vbOpacityData.value = option;
        this.toolService.updateViewBoxOpacity(optionValue);
    }
}