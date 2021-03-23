export = Line;
declare class Line {
    /**
     * @param {DiviaAPI} api
     * @param {object} data
     */
    constructor(api: DiviaAPI, data: object);
    api: DiviaAPI;
    data: any;
    /**
     * @param {string} id
     * @returns {Stop}
     */
    getStop(id: string): Stop;
    /**
     * @param {string} stopName
     * @returns {Stop}
     */
    findStop(stopName: string): Stop;
}
declare namespace Line {
    export { Line as default };
}
import DiviaAPI = require("./");
import Stop = require("./Stop");
