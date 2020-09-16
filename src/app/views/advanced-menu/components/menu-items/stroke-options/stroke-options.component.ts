import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdvancedMenuSettingsService } from 'src/app/services/advancedMenuSettings.service';
import { IOptionSelectorInput } from '../../form-items/option-selector/option-selector.component';

export interface StrokeOptionsComponentSettings {
    strokeType: IOptionSelectorInput;
    strokeRender: IOptionSelectorInput;
    currentColor: string;
    currentAlpha: string;
}

@Component({
    selector: 'app-stroke-options',
    templateUrl: './stroke-options.component.html',
    styleUrls: ['./stroke-options.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class StrokeOptionsComponent implements OnInit {
    componentSettings: StrokeOptionsComponentSettings;

    constructor(private settingsService: AdvancedMenuSettingsService) {}

    ngOnInit(): void {
        this.componentSettings = this.settingsService.strokeSettings;
    }

    updateStrokeType(type): void {
        this.componentSettings.strokeType.value = type;
    }

    updateHue(color): void {
        this.componentSettings.currentColor = color;
    }

    updateSaturation(color): void {
        this.componentSettings.currentColor = color;
    }

    updateAlpha(alpha): void {
        this.componentSettings.currentAlpha = alpha;
    }

    updateShapeRender(option): void {
        this.componentSettings.strokeRender.value = option;
    }
}