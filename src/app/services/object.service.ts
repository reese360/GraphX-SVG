import { IShapeHashMap } from '../interfaces/IShapeHashMap.interface';
import { IShape } from '../Interfaces/IShape.interface';

export class ObjectService {
	private objectMap: IShapeHashMap = {}; // hash map to hold refs to shape objects

	add(shape: IShape): void {
		this.objectMap[shape.id] = shape;
	}

	remove(id: string): void {
		delete this.objectMap[id];
    }

    fetch(id: string): IShape {
        return this.objectMap[id];
    }

    get objects() : IShapeHashMap {
        return this.objectMap;
    }
}