export = Stop;
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
declare class Stop {
    /**
     * @param {DiviaAPI} api
     * @param {Line} api
     * @param {object} data
     */
    constructor(api: DiviaAPI, line: any, data: object);
    api: DiviaAPI;
    line: any;
    data: any;
    /**
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
    totem(): Promise<{
        '@id': number;
        duree: string;
        destination: string;
        minutes: string;
        duree2: string;
        departure_date_time: string;
        now_date_time: string;
    }[]>;
}
declare namespace Stop {
    export { Stop as default, StopObject };
}
import DiviaAPI = require("./");
type StopObject = any;
