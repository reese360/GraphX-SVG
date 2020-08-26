import { Component } from '@angular/core';
import { ToolInputService } from './services/toolInput.service';
import { SelectorService } from './services/selector.service';
import { ObjectService } from './services/object.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ToolInputService, SelectorService, ObjectService],
})
export class AppComponent {
	title = 'ngGraphX';
}
