import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-drop-down-menu',
	templateUrl: './drop-down-menu.component.html',
	styleUrls: ['./drop-down-menu.component.css'],
})
export class DropDownMenuComponent implements OnInit {
	@Input() label: string;
	@Input() menuItems: string[] = [];
	@ViewChild('dropDownButton', { read: ElementRef }) menuButtonRef: ElementRef;
	@ViewChild('dropDownContent', { read: ElementRef }) menuContentRef: ElementRef;
	displayOpen: boolean = false;

	constructor(private renderer: Renderer2) {
		// if user clicks outside of menu button -> close menu
		this.renderer.listen('window', 'click', (e: Event) => {
			if (this.displayOpen && e.target !== this.menuButtonRef.nativeElement) {
				this.displayOpen = false;
				this.closeContent();
			}
		});
	}

	ngOnInit(): void {}

	// toggle drop down menu display
	handleDropDownClick(): void {
		this.displayOpen = !this.displayOpen;
		if (this.displayOpen) {
			this.renderer.addClass(this.menuContentRef.nativeElement, 'drop-down-content-open');
			this.renderer.addClass(this.menuButtonRef.nativeElement, 'drop-down-menu-button-active');
		} else
			this.closeContent();
	}

	// remove display classes on drop down menu
	closeContent(): void {
		this.renderer.removeClass(this.menuContentRef.nativeElement, 'drop-down-content-open');
		this.renderer.removeClass(this.menuButtonRef.nativeElement, 'drop-down-menu-button-active');
	}

	// handle output of menu item that is clicked
	handleMenuItemClickEvent(e: string): void {
		console.log(e);
	}
}
