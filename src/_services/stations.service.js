/**
 * src/_services/stations.service.js
 * accessor for retrieving the station list from the API
 */
import {handleJsonResponse} from '../_helpers'
import {STATIONS_API} from "../constants";

export const stationsService = {
    getAll
};

/**
 * getAll returns a promise that when resolved has the value of the returned station list from the API
 * @returns {Promise<Response>}
 */
function getAll() {
    return fetch(STATIONS_API, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'text/plain',
        },
    })
        .then(handleJsonResponse)
        .catch(function (error) {
            if (error.code !== 404) {
                return Promise.reject(new Error("Could not reach the API: " + STATIONS_API))
            } else {
                return Promise.reject(new Error(error.message))
            }
        })
}