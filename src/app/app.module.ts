import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import {DropDownComponent } from './views/simple-menu/components/drop-down/drop-down.component';
import { SliderComponent } from './views/advanced-menu/components/slider/slider.component';
import { CodeDrawerComponent } from './views/code-drawer/code-drawer.component';
import { AdvancedMenuComponent } from './views/advanced-menu/advanced-menu.component';
import { SimpleMenuComponent } from './views/simple-menu/simple-menu.component';
import { GraphxCanvasComponent } from './views/graphx-canvas/graphx-canvas.component';


@NgModule({
	declarations: [AppComponent, DropDownComponent, SliderComponent, CodeDrawerComponent, AdvancedMenuComponent, SimpleMenuComponent, GraphxCanvasComponent],
	imports: [BrowserModule, FontAwesomeModule, ColorSketchModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
