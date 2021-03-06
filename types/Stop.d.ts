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
     *   text: string,
     *   date: Date
     * }[]>}
     */
    totem(): Promise<{
        text: string;
        date: Date;
    }[]>;
}
declare namespace Stop {
    export { Stop as default, StopObject };
}
import DiviaAPI = require("./");
type StopObject = any;
