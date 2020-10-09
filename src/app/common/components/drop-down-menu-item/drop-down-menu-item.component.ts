import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-drop-down-menu-item',
	templateUrl: './drop-down-menu-item.component.html',
	styleUrls: ['./drop-down-menu-item.component.css'],
})
export class DropDownMenuItemComponent implements OnInit {
	@Input() label: string;
	@Output() menuItemClickEvent: EventEmitter<string> = new EventEmitter<string>();

	ngOnInit(): void {}

	handleClickEvent(): void {
		this.menuItemClickEvent.emit(this.label);
	}
}
