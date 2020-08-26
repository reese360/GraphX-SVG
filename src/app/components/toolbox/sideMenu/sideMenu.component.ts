import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SliderComponent } from '../tools/slider/slider.component';

@Component({
	selector: 'app-side-menu',
	templateUrl: './sideMenu.component.html',
	styleUrls: ['./sideMenu.component.css'],
})
export class SideMenuComponent implements OnInit {
	@ViewChild('slider') slider: SliderComponent;
	constructor() {}

	ngOnInit(): void {}

	toggleItemDisplay(item: string): void {
		this.slider.toggleOpen();
	}
}
