import { Component, OnInit, ViewChild } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';

@Component({
	selector: 'app-advanced-menu',
	templateUrl: './advanced-menu.component.html',
	styleUrls: ['./advanced-menu.component.css'],
})
export class AdvancedMenuComponent implements OnInit {
	@ViewChild('slider') slider: SliderComponent;
	currentView: string;

	constructor() {}

	ngOnInit(): void {}

	toggleItemDisplay(view: string): void {
		this.slider.toggleSlider(view);
	}
}
