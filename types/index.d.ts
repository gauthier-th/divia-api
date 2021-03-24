export = DiviaAPI;
declare class DiviaAPI {
    /** @type {object} */
    reseau: object;
    baseURL: string;
    /** @type {string} */
    _token: string;
    init(): Promise<void>;
    /**
     * @param {string} id
     * @returns {Line}
     */
    getLine(id: string): Line;
    /**
     * @param {string} name
     * @param {string} direction
     * @returns {Line}
     */
    findLine(name: string, direction?: string): Line;
    /**
     * @param {string} lineName
     * @param {string} stopName
     * @param {string} direction
     * @returns {Stop}
     */
    findStop(lineName: string, stopName: string, direction?: string): Stop;
    get lines(): any;
    get stops(): any;
    _getToken(): Promise<string>;
}
declare namespace DiviaAPI {
    export { DiviaAPI as default };
}
import Line = require("./Line");
import Stop = require("./Stop");
