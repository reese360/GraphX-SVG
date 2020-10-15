import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { IShape } from 'src/app/Interfaces/IShape.interface'
import { IShapeHashMap } from 'src/app/interfaces/IShapeHashMap.interface'
import { ObjectService } from 'src/app/services/object.service'
import { SelectionService } from 'src/app/services/selectionTool.service'

@Component({
	selector: 'app-objects',
	templateUrl: './objects.component.html',
	styleUrls: ['./objects.component.css'],
})
export class ObjectsComponent implements OnInit {
	objectMap: IShapeHashMap = {}
	constructor(public objectSvc: ObjectService, private selectSvc: SelectionService, private cdRef: ChangeDetectorRef) {
		this.objectSvc.objectAddedEvent.subscribe((shape: IShape) => {
			this.objectMap = this.objectSvc.objects
			this.cdRef.detectChanges()
		})
	}

	ngOnInit(): void {
		this.objectMap = this.objectSvc.objects
	}

	handleDataUpdate(arg: string): void {
		console.log(arg)
	}
}
