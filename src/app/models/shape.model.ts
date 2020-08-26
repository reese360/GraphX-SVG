import { nanoid } from 'nanoid/non-secure';

export class ShapeModel {
	id: string;
	constructor() {
		this.id = nanoid();
	}
}
