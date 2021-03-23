const DiviaAPI = require('./');
const Line = require('./Line');
const { v4: uuidv4 } = require('uuid');

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
	 * @returns {{
	 *   '@id': number,
	 *   duree: string,
	 *   destination: string,
	 *   minutes: string,
	 *   duree2: string,
	 *   departure_date_time: string,
	 *   now_date_time: string
	 * }[]}
	 */
	async totem() {
		const token = await this.api._getToken();
		const response = await this.api.httpInstance.get('get/totem', {
			params: {
				source_type: 'bo_divia_utilisateur',
				source_uuid: uuidv4(),
				source_id: '',
				ligne: this.line.data.id,
				arret: this.data.id,
				token
			}
		});
		return response.data.result_infos.totem;
	}

}

module.exports = Stop;
module.exports.default = Stop;