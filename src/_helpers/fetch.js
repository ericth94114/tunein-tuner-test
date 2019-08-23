/**
 * src/_helpers/fetch.js
 * helpers for processing API requests
  */

import {isJson} from '../_helpers/isJson'

/**
 * handleJsonResponse takes care of common parsing and error handling of API returned values
 * @param response
 * @returns {Q.Promise<any> | Promise<any> | * | PromiseLike<any>}
 */
export function handleJsonResponse(response) {
    return response.text()
        .then(text => {
            if (!response.ok) {
                const error = {code: response.status, message: response.statusText};
                return Promise.reject(error)
            }
            const json = isJson(text);
            if (!json.valid) {
                const error = {code: 500, message: 'Invalid JSON:' + text};
                return Promise.reject(error)
            }

            return json.value.data
        })
}