import FileReader from 'fs';
import fetch from 'node-fetch';

const _key = FileReader.readFileSync('apiKey.txt', 'utf8');

/**
 * Send information to the requested API with parameters. Returns a Promise object. 
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await sendToAPI(...)**
 * 
 * @param {string} url - URL of API
 * @param {object} params - parameters to send
 * @returns {Promise<unknown>} Response data from API
 */
export const sendToAPI = (url, params) => {
    params.apiKey = _key;
    const data = fetch(url + '?' + new URLSearchParams(params)).then(response => response.json());
    return data;
}

/**
 * Send information to database. TODO stub method.
 * 
 * @param {object} params 
 * @returns 
 */
export const sendToDB = params => {
    return null;
}