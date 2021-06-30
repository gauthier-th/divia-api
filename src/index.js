const fetch = require('isomorphic-unfetch');
const Line = require('./Line');
const Stop = require('./Stop');

class DiviaAPI {

	constructor() {
		/** @type {object} */
		this.reseau = null;
		/** @type {string} */
		this._token = null;
	}

	async init() {
		const response = await fetch('https://bo-api.divia.fr/api/reseau/type/json').then(res => res.json());
		this.reseau = response;
	}

	/**
	 * @param {string} id 
	 * @returns {Line}
	 */
	getLine(id) {
		const line = Object.values(this.reseau.arborescence.lignes).find(ligne => ligne.id === id);
		if (line)
			return new Line(this, line);
	}

	/**
	 * @param {string} name 
	 * @param {string} direction 
	 * @returns {Line}
	 */
	findLine(name, direction = 'A') {
		for (let line of Object.values(this.reseau.arborescence.lignes)) {
			if (line.codetotem === name && line.senstotem === direction)
				return new Line(this, line);
		}
	}

	/**
	 * @param {string} lineName 
	 * @param {string} stopName 
	 * @param {string} direction 
	 * @returns {Stop}
	 */
	findStop(lineName, stopName, direction = 'A') {
		const line = this.findLine(lineName, direction);
		if (line)
			return line.findStop(stopName);
	}

	/**
	 * @returns {Line.LineObject[]}
	 */
	get lines() {
		return Object.values(this.reseau.lignes);
	}

	/**
	 * @returns {Stop.StopObject[]}
	 */
	get stops() {
		return Object.values(this.reseau.arrets);
	}

}

module.exports = DiviaAPI;
module.exports.default = DiviaAPI;