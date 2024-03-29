const assert = require('assert');
const DiviaAPI = require('../src');

describe('DiviaAPI', async function() {
	this.timeout(5000);

	const instance = new DiviaAPI();
	describe('#init', () => {
		it('should fetch all bus/tramway lines', async () => {
			await instance.init().then(() => assert.ok(true)).catch(() => assert.fail());
		});
		it('lines should be an object with required properties', () => {
			assert.ok(
				instance.reseau &&
				typeof instance.reseau === 'object' &&
				typeof instance.reseau.arborescence === 'object' &&
				typeof instance.reseau.arrets === 'object' &&
				typeof instance.reseau.lignes === 'object' &&
				Array.isArray(instance.reseau.communes) &&
				Array.isArray(instance.reseau.poles) &&
				Array.isArray(instance.reseau.dessertes) &&
				Array.isArray(instance.reseau.services) &&
				typeof instance.reseau.liaisons === 'object'
			)
		});
	});
	describe('#getLine', () => {
		it('should find a tram line by its ID', () => {
			const line = instance.getLine('81');
			if (!line)
				assert.fail();
			else
				assert.ok(true);
		});
	});
	describe('#findLine', () => {
		it('should find a tram line by its name', () => {
			const line = instance.findLine('T1');
			if (!line)
				assert.fail();
			else
				assert.ok(true);
		});
		it('should find a tram line in a specific direction by its name', () => {
			const line = instance.findLine('T1', 'R');
			if (!line)
				assert.fail();
			else
				assert.ok(true);
		});
	});
	describe('#findStop', () => {
		it('should find a tram stop by its name', () => {
			const stop = instance.findStop('T1', 'République T1');
			if (!stop)
				assert.fail();
			else
				assert.ok(true);
		});
		it('should find a tram stop in a specific direction by its name', () => {
			const stop = instance.findStop('T1', 'République T1', 'R');
			if (!stop)
				assert.fail();
			else
				assert.ok(true);
		});
	});
	describe('#totem', () => {
		it('should find next totem passages', async () => {
			const stop = instance.findStop('T1', 'République T1');
			if (!stop)
				assert.fail();
			else
				assert.ok(true);
			await stop.totem().then(passages => {
				console.log(passages);
				if (Array.isArray(passages)) {
					for (let passage of passages) {
						if (!passage.text.match(/^(0?|[12])\d:\d{2}$/ || !(passage.date instanceof Date)))
							return assert.fail();
					}
					assert.ok(true);
				}
				else
					assert.fail();
			}).catch(() => assert.fail());
		});
	});
});
