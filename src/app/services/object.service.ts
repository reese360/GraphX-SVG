import { IShapeHashMap } from '../interfaces/IShapeHashMap.interface'
import { IShape } from '../Interfaces/IShape.interface'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ObjectService {
	private objectMap: IShapeHashMap = {} // hash map to hold refs to shape objects
	public objectAddedEvent: Subject<IShape> = new Subject<IShape>()
	public objectRemovedEvent: Subject<IShape> = new Subject<IShape>()

	add(shape: IShape): void {
		this.objectMap[shape.id] = shape
		this.objectAddedEvent.next(shape)
	}

	remove(id: string): void {
		delete this.objectMap[id]
	}

	fetch(id: string): IShape {
		return this.objectMap[id]
	}

	get objects(): IShapeHashMap {
		return this.objectMap
	}
}
