import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { DropDownComponent } from './views/simple-menu/components/drop-down/drop-down.component';
import { SliderComponent } from './views/advanced-menu/components/slider/slider.component';
import { CodeDrawerComponent } from './views/code-drawer/code-drawer.component';
import { AdvancedMenuComponent } from './views/advanced-menu/advanced-menu.component';
import { SimpleMenuComponent } from './views/simple-menu/simple-menu.component';
import { GraphxCanvasComponent } from './views/graphx-canvas/graphx-canvas.component';
import { GridlinesMenuItemComponent } from './views/advanced-menu/components/menu-items/gridlines/gridlines.component';
import { OptionSelectorComponent } from './views/advanced-menu/components/form-items/option-selector/option-selector.component';
import { NumberInputComponent } from './views/advanced-menu/components/form-items/number-input/number-input.component';
import { ViewBoxComponent } from './views/advanced-menu/components/menu-items/viewbox/viewbox.component';
import { MenuItemTitleDirective } from './directives/menu-item-title.directive';
import { MenuItemContentDirective } from './directives/menu-item-content.directive';
import { LockIconDirective } from './directives/lock-icon.directive';
import { AboutComponent } from './views/advanced-menu/components/menu-items/about/about.component';


@NgModule({
    declarations: [
        AppComponent,
        DropDownComponent,
        SliderComponent,
        CodeDrawerComponent,
        AdvancedMenuComponent,
        SimpleMenuComponent,
        GraphxCanvasComponent,
        GridlinesMenuItemComponent,
        OptionSelectorComponent,
        NumberInputComponent,
        ViewBoxComponent,
        MenuItemTitleDirective,
        MenuItemContentDirective,
        LockIconDirective,
        AboutComponent,
    ],
    imports: [BrowserModule, FontAwesomeModule, ColorSketchModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}