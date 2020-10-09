import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorHueModule } from 'ngx-color/hue';
import { ColorAlphaModule } from 'ngx-color/alpha';
import { SliderComponent } from './views/advanced-menu/components/slider/slider.component';
import { CodeDrawerComponent } from './views/code-drawer/code-drawer.component';
import { AdvancedMenuComponent } from './views/advanced-menu/advanced-menu.component';
import { TopMenuComponent } from './views/top-menu/top-menu.component';
import { GraphxCanvasComponent } from './views/graphx-canvas/graphx-canvas.component';
import { GridlinesMenuItemComponent } from './views/advanced-menu/components/menu-items/gridlines/gridlines.component';
import { OptionSelectorComponent } from './views/advanced-menu/components/form-items/option-selector/option-selector.component';
import { ViewBoxComponent } from './views/advanced-menu/components/menu-items/viewbox/viewbox.component';
import { MenuItemTitleDirective } from './directives/menu-item-title.directive';
import { MenuItemContentDirective } from './directives/menu-item-content.directive';
import { AboutComponent } from './views/advanced-menu/components/menu-items/about/about.component';
import { StrokeOptionsComponent } from './views/advanced-menu/components/menu-items/stroke-options/stroke-options.component';
import { SaturationPickerComponent } from './views/advanced-menu/components/form-items/color/saturation-picker/saturation-picker.component';
import { FormItemLabelDirective } from './directives/form-item-label.directive';
import { HuePickerComponent } from './views/advanced-menu/components/form-items/color/hue-picker/hue-picker.component';
import { AlphaPickerComponent } from './views/advanced-menu/components/form-items/color/alpha-picker/alpha-picker.component';
import { HexDisplayComponent } from './views/advanced-menu/components/form-items/color/hex-display/hex-display.component';
import { FillOptionsComponent } from './views/advanced-menu/components/menu-items/fill-options/fill-options.component';
import { MenuItemDisabledDirective } from './directives/menu-item-disabled.directive';
import { InputSliderComponent } from './views/advanced-menu/components/form-items/input-slider/input-slider.component';
import { InputNumberComponent } from './views/advanced-menu/components/form-items/input-number/input-number.component';
import { LockComponent } from './common/components/lock/lock.component';
import { ShapeMenuComponent } from './views/shape-menu/shape-menu.component';
import { MenuIconDirective } from './directives/menu-icon.directive';
import { DropDownMenuComponent } from './common/components/drop-down-menu/drop-down-menu.component';
import { DropDownMenuItemComponent } from './common/components/drop-down-menu-item/drop-down-menu-item.component';

@NgModule({
	declarations: [
		AppComponent,
		SliderComponent,
		CodeDrawerComponent,
		AdvancedMenuComponent,
		TopMenuComponent,
		GraphxCanvasComponent,
		GridlinesMenuItemComponent,
		OptionSelectorComponent,
		ViewBoxComponent,
		MenuItemTitleDirective,
		MenuItemContentDirective,
		AboutComponent,
		StrokeOptionsComponent,
		SaturationPickerComponent,
		FormItemLabelDirective,
		HuePickerComponent,
		AlphaPickerComponent,
		HexDisplayComponent,
		FillOptionsComponent,
		MenuItemDisabledDirective,
		InputSliderComponent,
		InputNumberComponent,
		LockComponent,
		ShapeMenuComponent,
		MenuIconDirective,
		DropDownMenuComponent,
		DropDownMenuItemComponent,
	],
	imports: [BrowserModule, FontAwesomeModule, ColorSketchModule, BrowserAnimationsModule, ColorHueModule, ColorAlphaModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
