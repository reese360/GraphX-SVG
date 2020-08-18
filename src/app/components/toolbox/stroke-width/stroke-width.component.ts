import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ToolInputService } from '../../../services/toolInput.service';

@Component({
	selector: 'app-stroke-width',
	templateUrl: './stroke-width.component.html',
	styleUrls: ['./stroke-width.component.css'],
})
export class StrokeWidthComponent implements AfterViewInit {
	@ViewChild('strokeDropDownBtn', { read: ElementRef }) strokeDropDownBtn: ElementRef;
	@ViewChild('strokeDropDownContent', { read: ElementRef }) strokeDropDownContent: ElementRef;

	strokeOptions: string[][] = [
		['0', '15', '100', '15', 'stroke-width: 2;', '2'],
		['0', '15', '100', '15', 'stroke-width: 4;', '4'],
		['0', '15', '100', '15', 'stroke-width: 6;', '6'],
		['0', '15', '100', '15', 'stroke-width: 10;', '10'],
		['0', '15', '100', '15', 'stroke-width: 14;', '14'],
		['0', '15', '100', '15', 'stroke-width: 20;', '20'],
	];
	strokeDisplay: string[] = this.strokeOptions[0];
	dropDownOpen: boolean = false;

	constructor(private toolService: ToolInputService, private renderer: Renderer2) {}

    ngAfterViewInit(): void {
		this.toolService.strokeSize = Number(this.strokeDisplay[5]);
		this.renderer.listen('window', 'click', (e: Event) => {
			if (e.target !== this.strokeDropDownBtn.nativeElement) {
				this.renderer.removeClass(this.strokeDropDownContent.nativeElement, 'show');
				this.dropDownOpen = false;
			}
		});
	}

	toggleDropDown(): void {
		this.dropDownOpen = true;
		this.renderer.addClass(this.strokeDropDownContent.nativeElement, 'show');
	}

	updateSize(index: number): void {
		this.strokeDisplay = this.strokeOptions[index];
		this.toolService.strokeSize = Number(this.strokeDisplay[5]);
		console.log(this.toolService.strokeSize);
	}
}
