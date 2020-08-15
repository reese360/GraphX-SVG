import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [AppComponent, ToolboxComponent, CanvasComponent],
	imports: [BrowserModule, FontAwesomeModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
