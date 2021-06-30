const fetch = require('isomorphic-unfetch');
const jwt_decode = require('jwt-decode');
const Line = require('./Line');
const Stop = require('./Stop');

const baseURL = 'https://tim.divia.fr/api/';

class DiviaAPI {

	constructor() {
		/** @type {object} */
		this.reseau = null;
		this.baseURL = baseURL;
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

	/**
	 * @param {string} username 
	 * @param {string} password 
	 */
	async _getToken(username, password) {
		if (!this._token || jwt_decode(this._token).exp <= Math.round(Date.now() / 1000)) {
			const response = await fetch(`${baseURL}login_check`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `_username=${username}&_password=${password}`
			}).then(res => res.json());
			this._token = response.token;
		}
		return this._token;
	}

}

module.exports = DiviaAPI;
module.exports.default = DiviaAPI;