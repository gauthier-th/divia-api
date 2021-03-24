export = Line;
/**
 * @typedef LineObject
 * @param {string} id
 * @param {string} codetotem
 * @param {string} senstotem
 * @param {string} nom
 * @param {string} nom_commercial
 * @param {string} direction
 * @param {string} directionar
 * @param {string} sorting
 * @param {boolean} favori
 * @param {string} type
 * @param {boolean} deleted
 * @param {object} service
 * @param {string} fonctionnement
 * @param {string} jours_circulation
 * @param {string} frequences_journee_semaine
 * @param {string} amplitude_horaires_semaine
 * @param {string} frequences_journee_samedi
 * @param {string} amplitude_horaires_samedi
 * @param {string} frequences_journee_dimanche
 * @param {string} amplitude_horaires_dimanche
 * @param {string} fonctionnement_en
 * @param {string} jours_circulation_en
 * @param {string} frequences_journee_semaine_en
 * @param {string} amplitude_horaires_semaine_en
 * @param {string} frequences_journee_samedi_en
 * @param {string} amplitude_horaires_samedi_en
 * @param {string} frequences_journee_dimanche_en
 * @param {string} amplitude_horaires_dimanche_en
 * @param {string} premiers_departs
 * @param {string} derniers_departs
 * @param {any[]} dessertes
 * @param {any[]} poles
 * @param {any[]} communes
 * @param {string} nombre_stations
 * @param {string} longueur
 * @param {string} fichier_thermometre
 * @param {string} fichier_thermometre_pdf
 * @param {string} descriptif_thermometre
 * @param {string} descriptif_thermometre_en
 * @param {string} trace
 * @param {string} picto
 * @param {any} arrets_flux
 * @param {string} couleur
 */
declare class Line {
    /**
     * @param {DiviaAPI} api
     * @param {object} data
     */
    constructor(api: DiviaAPI, data: object);
    api: DiviaAPI;
    data: any;
    /**
     * @return {Stop.StopObject[]}
     */
    get stops(): any[];
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
    export { Line as default, LineObject };
}
import DiviaAPI = require("./");
import Stop = require("./Stop");
type LineObject = any;
