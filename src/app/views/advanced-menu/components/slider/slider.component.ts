import { Component, ViewChild, Renderer2, ElementRef, Input, AfterViewInit } from '@angular/core'

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements AfterViewInit {
	// TODO: reset these to not have slider open at launch
	currentView: string = 'objects' // used to determine which menu item to display on slider /
	sliderOpen: boolean = false // flag if slider is open
	@ViewChild('slider') sliderElRef: ElementRef

	constructor(private renderer: Renderer2) {}

	ngAfterViewInit(): void {
		this.toggleSlider(this.currentView)
	}

	// opens/ closes slider and sets view
	toggleSlider(view: string): void {
		if (!this.sliderOpen) {
			// slider is NOT open
			this.currentView = view
			this.sliderOpen = true
			this.renderer.addClass(this.sliderElRef.nativeElement, 'display-open')
		} else {
			// slider is open
			if (this.currentView === view) {
				// close slider
				this.sliderOpen = false
				this.renderer.removeClass(this.sliderElRef.nativeElement, 'display-open')
			} else {
				this.currentView = view
			}
		}
	}
}
