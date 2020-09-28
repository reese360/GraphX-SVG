import { Component } from '@angular/core';
import { InputService } from './services/inputTool.service';
import { SelectionService } from './services/selectionTool.service';
import { ObjectService } from './services/object.service';
import { DrawService } from './services/draw.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [InputService, SelectionService, ObjectService, DrawService],
})
export class AppComponent {
	title = 'GraphX - SVG';
}
