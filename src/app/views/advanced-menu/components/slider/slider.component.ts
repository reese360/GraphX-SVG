import { Component, OnInit, ViewChild, Renderer2, ElementRef, Input } from '@angular/core';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
	currentView: string;
	sliderOpen: boolean = false;

	@ViewChild('slider') sliderElRef: ElementRef;

	constructor(private renderer: Renderer2) {}

	ngOnInit(): void {}

	toggleSlider(view: string): void {
		if (!this.sliderOpen) {
			// slider is NOT open
			this.currentView = view;
			this.sliderOpen = true;
			this.renderer.addClass(this.sliderElRef.nativeElement, 'displayOpen');
		} else {
			// slider is open
			if (this.currentView === view) {
				// close slider
				this.sliderOpen = false;
				this.renderer.removeClass(this.sliderElRef.nativeElement, 'displayOpen');
			} else {
				this.currentView = view;
			}
		}
	}
}
