export class ShapeModel {
	id: string;
	constructor() {
		this.id = this.hashId();
	}

	hashId(): string {
		return 'xxxxx-xxxxx-xxxxx-xxxxx'.replace(/[xy]/g, (c) => {
			// tslint:disable-next-line: no-bitwise
			const r = (Math.random() * 16) | 0;
			// tslint:disable-next-line: no-bitwise
			const v = c === 'x' ? r : (r & 0x3) | 0x8;
			return v.toString();
		});
	}
}
