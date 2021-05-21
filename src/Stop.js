const fetch = require('isomorphic-unfetch');
const DiviaAPI = require('./');
const Line = require('./Line');

/**
 * @typedef StopObject
 * @param {string} id 
 * @param {string} code 
 * @param {string} nom 
 * @param {boolean} favori 
 * @param {string} longitude 
 * @param {string} latitude 
 * @param {string} recherche 
 * @param {string} direction 
 */

class Stop {

	/**
	 * @param {DiviaAPI} api 
	 * @param {Line} api 
	 * @param {object} data 
	 */
	constructor(api, line, data) {
		this.api = api;
		this.line = line;
		this.data = data;
	}

	/**
	 * @returns {Promise.<{
	 *   text: string,
	 *   date: Date
	 * }[]>}
	 */
	async totem() {
		const result = [];
		try {
			const html = await fetch('https://www.divia.fr/bus-tram?type=479', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'X-Requested-With': 'XMLHttpRequest'
				},
				body: `requete=arret_prochainpassage&requete_val%5Bid_ligne%5D=${this.line.data.id}&requete_val%5Bid_arret%5D=${this.data.code}`
			}).then(res => res.text());
			let matches;
			const regex = /<span class="uk-badge">\s*(((0?|[12])\d):(\d{2}))<\/span>/gi;
			while (matches = regex.exec(html)) {
				const hours = matches[2];
				const minutes = matches[4];
				const date = new Date();
				date.setHours(hours, minutes, 0, 0);
				result.push({
					text: matches[1],
					date
				});
			}
		}
		finally {
			return result;
		}
	}

}

module.exports = Stop;
module.exports.default = Stop;