export = Stop;
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
    export { Stop as default };
}
import DiviaAPI = require("./");
