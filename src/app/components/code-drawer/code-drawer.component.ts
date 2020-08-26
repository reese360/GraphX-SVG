import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ObjectService } from 'src/app/services/object.service';

@Component({
	selector: 'app-code-drawer',
	templateUrl: './code-drawer.component.html',
	styleUrls: ['./code-drawer.component.css'],
})
export class CodeDrawerComponent implements OnInit {
	@ViewChild('svgCodeDrawer') codeDrawer: ElementRef;
	@ViewChild('codeDisplay') codeDisplay: ElementRef;
	drawerOpen: boolean = false;

	constructor(private renderer: Renderer2, private objectService: ObjectService) {}

	ngOnInit(): void {}

	toggleOpen(): void {
		this.drawerOpen = !this.drawerOpen;
		if (this.drawerOpen) {
			this.renderer.addClass(this.codeDrawer.nativeElement, 'displayOpen');
		} else {
			this.renderer.removeClass(this.codeDrawer.nativeElement, 'displayOpen');
		}
	}
}
