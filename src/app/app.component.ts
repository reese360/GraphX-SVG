import { Component } from '@angular/core';
import { ToolInputService } from './services/toolInput.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [ToolInputService],
})
export class AppComponent {
	title = 'ngGraphX';
}
