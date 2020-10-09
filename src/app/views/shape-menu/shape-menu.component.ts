import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-shape-menu',
	templateUrl: './shape-menu.component.html',
	styleUrls: ['./shape-menu.component.css'],
})
export class ShapeMenuComponent implements OnInit {
	selectedTool: number = 0;
	selectedShape: number = 0;

	constructor() {}

	ngOnInit(): void {}

	handleToolClick(clickValue: number): void {
		this.selectedTool = clickValue;
	}

	handleShapeClick(clickValue: number): void {
		this.selectedShape = clickValue;
	}
}
