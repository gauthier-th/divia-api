const DiviaAPI = require('./');
const Stop = require('./Stop');

class Line {

	/**
	 * @param {DiviaAPI} api 
	 * @param {object} data 
	 */
	constructor(api, data) {
		this.api = api;
		this.data = data;
	}

	get stops() {
		return this.data.arrets[id];
	}

	/**
	 * @param {string} id 
	 * @returns {Stop}
	 */
	getStop(id) {
		const stop = this.data.arrets[id];
		if (stop)
			return new Stop(this.api, this, stop);
	}

	/**
	 * @param {string} stopName 
	 * @returns {Stop}
	 */
	findStop(stopName) {
		for (let stop of Object.values(this.data.arrets)) {
			if (stop.nom === stopName)
				return new Stop(this.api, this, stop);
		}
	}

}

module.exports = Line;
module.exports.default = Line;