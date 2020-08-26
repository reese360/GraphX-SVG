import { Component, Renderer2, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToolInputService } from '../../../../services/toolInput.service';

@Component({
	selector: 'app-drop-down',
	templateUrl: './drop-down.component.html',
	styleUrls: ['./drop-down.component.css'],
})
export class DropDownComponent implements OnInit {
	@ViewChild('strokeDropDownBtn', { read: ElementRef }) strokeDropDownBtn: ElementRef;
	@ViewChild('strokeDropDownContent', { read: ElementRef }) strokeDropDownContent: ElementRef;
	@Input() dropDownOptions: string[][];
    @Output() dropDownSelectionEvent: EventEmitter<string> = new EventEmitter<string>();
	dropDownDisplayItem: string[];
	dropDownOpen: boolean = false;

	constructor(private toolService: ToolInputService, private renderer: Renderer2) {}

	ngOnInit(): void {
		this.dropDownDisplayItem = this.dropDownOptions[0];
		this.toolService.strokeSize = Number(this.dropDownDisplayItem[5]);

		// event listener to close the drop down menu if user clicks anywhere else
		this.renderer.listen('window', 'click', (e: Event) => {
			if (e.target !== this.strokeDropDownBtn.nativeElement) {
				this.renderer.removeClass(this.strokeDropDownContent.nativeElement, 'show');
				this.dropDownOpen = false;
			}
		});
	}

	toggleDropDown(): void {
		this.dropDownOpen = !this.dropDownOpen;
		if (this.dropDownOpen) {
			this.renderer.addClass(this.strokeDropDownContent.nativeElement, 'show');
		} else {
			this.renderer.removeClass(this.strokeDropDownContent.nativeElement, 'show');
		}
	}

	updateDisplay(index: number): void {
		this.dropDownDisplayItem = this.dropDownOptions[index];
		this.dropDownSelectionEvent.emit(this.dropDownDisplayItem[5]);
	}
}
