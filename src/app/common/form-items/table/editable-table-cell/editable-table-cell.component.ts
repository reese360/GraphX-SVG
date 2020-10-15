import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-editable-table-cell',
	templateUrl: './editable-table-cell.component.html',
	styleUrls: ['./editable-table-cell.component.css'],
})
export class EditableTableCellComponent implements OnInit {
	@Input() value: string = 'ERR: No Data';

	disabledInput: boolean = true;
	justClicked = false;
	doubleClicked = false;
	isSingleClick: boolean = true;

	@ViewChild('cellContainer', { read: ElementRef }) cellContainer!: ElementRef;
	@ViewChild('cellInput', { read: ElementRef }) cellInput!: ElementRef;

	constructor() {}

	ngOnInit(): void {}

	handleClickEvent(): void {
		this.cellContainer.nativeElement.style.backgroundColor = 'var(--graphx-highlight1)';
		this.cellInput.nativeElement.style.color = '#fff';
		if (this.justClicked === true) {
			this.doubleClicked = true;
			this.handleDoubleClick();
		} else {
			this.justClicked = true;
			setTimeout(() => {
				this.justClicked = false;
				if (this.doubleClicked === false) {
					this.handleSingleClick();
				}
				this.doubleClicked = false;
			}, 200);
		}
	}

	handleSingleClick(): void {
		console.log('single');
	}

	handleDoubleClick(): void {
		console.log('double');
		this.disabledInput = false;
	}
}
