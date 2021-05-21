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
	 * @param {string} username 
	 * @param {string} password 
	 * @returns {Promise.<{
	 *   '@id': number,
	 *   duree: string,
	 *   destination: string,
	 *   minutes: string,
	 *   duree2: string,
	 *   departure_date_time: string,
	 *   now_date_time: string
	 * }[]>}
	 */
	async totem(username, password) {
		const token = await this.api._getToken(username, password);
		const response = await fetch(`${this.api.baseURL}get/totem?source_type=bo_divia_utilisateur&source_uuid=${uuidv4()}&source_id=&ligne=${this.line.data.id}&arret=${this.data.code}&token=${token}`).then(res => res.json());
		return response.result_infos.totem;
	}

}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }

module.exports = Stop;
module.exports.default = Stop;