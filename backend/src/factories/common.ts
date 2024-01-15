export class TestData {
	static storage = {};
	static callStack = [];

	static async getData(entity: any, name: string, count = 1, options = {}): Promise<any | any[]> {
		name = `${name}_${count}`;
		if (!this.storage[name] && !this.callStack.includes(name)) {
			this.callStack.push(name);

			let records = [];
			for (let i = 0; i < count; i++)
				records.push(await new entity().build(options));

			if (records.length == 1)
				records = records.pop();

			this.storage[name] = records;
		}
		return this.storage[name];
	}
}