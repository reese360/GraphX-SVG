import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {

    @ViewChild('slider') element: ElementRef;
    displayOpen: boolean = false;
	constructor(private renderer: Renderer2) {}

	ngOnInit(): void {}


    toggleOpen() {
        this.displayOpen = !this.displayOpen;
        if (this.displayOpen) this.renderer.addClass(this.element.nativeElement, 'displayOpen')
        else this.renderer.removeClass(this.element.nativeElement, 'displayOpen')
    }
}
