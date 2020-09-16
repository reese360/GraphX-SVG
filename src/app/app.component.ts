import { Component } from '@angular/core';
import { InputService } from './services/toolInput.service';
import { SelectorService } from './services/selector.service';
import { ObjectService } from './services/object.service';
import { CurrentStateService } from './services/currentState.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [InputService, SelectorService, ObjectService, CurrentStateService],
})
export class AppComponent {
	title = 'GraphX - SVG';
}
