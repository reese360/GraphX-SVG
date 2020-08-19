import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolboxComponent } from './components/toolbox/topbar/topbar.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorSketchModule } from 'ngx-color/sketch';
import { StrokeWidthComponent } from './components/toolbox/stroke-width/stroke-width.component';
import { SidebarComponent } from './components/toolbox/sidebar/sidebar.component';


@NgModule({
	declarations: [AppComponent, ToolboxComponent, CanvasComponent, StrokeWidthComponent, SidebarComponent],
	imports: [BrowserModule, FontAwesomeModule, ColorSketchModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
