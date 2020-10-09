import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-lock',
	templateUrl: './lock.component.html',
	styleUrls: ['./lock.component.css'],
})
export class LockComponent implements OnInit {
	@Input() isLocked: boolean;
	@Output() updateLockOption: EventEmitter<boolean> = new EventEmitter<boolean>();

	ngOnInit(): void {}

	toggleLock(): void {
		this.updateLockOption.emit(this.isLocked);
	}
}
