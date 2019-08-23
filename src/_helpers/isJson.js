/**
 * src/_helpers/isJson.js
 */

/**
 * isJson attempts to parse the returned value of the API as a JSON object and return it along with a flag
 * to indicate success or failure
 * @param item
 * @returns {{valid: boolean, value: *}}
 */
export function isJson(item) {
    // do the easy quick checks first since JSON.parse is expensive
    if (typeof item === 'undefined') {
        return {value: item, valid: false}
    }

    if (typeof item !== 'string') {
        item = JSON.stringify(item)
    }

    if (
        !item.startsWith('{') ||
        !item.endsWith('}')) {
        return {value: item, valid: false}
    }

    try {
        item = JSON.parse(item)
    } catch (e) {
        return {value: item, valid: typeof item === 'object'}
    }
    return {value: item, valid: true}
}