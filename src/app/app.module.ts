import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { TopMenuComponent } from './components/toolbox/topMenu/topMenu.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { SideMenuComponent } from './components/toolbox/sideMenu/sideMenu.component';
import { DropDownComponent } from './components/toolbox/tools/drop-down/drop-down.component';
import { SliderComponent } from './components/toolbox/tools/slider/slider.component';
import { CodeDrawerComponent } from './components/code-drawer/code-drawer.component';


@NgModule({
	declarations: [AppComponent, TopMenuComponent, CanvasComponent, SideMenuComponent, DropDownComponent, SliderComponent, CodeDrawerComponent],
	imports: [BrowserModule, FontAwesomeModule, ColorSketchModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
