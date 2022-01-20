import FileReader from 'fs';
import fetch from 'node-fetch';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, deleteDoc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";

// initialized information
// const _key = FileReader.readFileSync('./apiKey.txt', 'utf8');
const _key = '8a99e21068e94ccb90b8c523abe8c07c';

initializeApp({
    apiKey: "AIzaSyD70HLFk3PA2uNigsYFEMhKHZPfXO9Nxvk",
    authDomain: "meal360.firebaseapp.com",
    projectId: "meal360",
    storageBucket: "meal360.appspot.com",
    messagingSenderId: "1040770398969",
    appId: "1:1040770398969:web:9a4d77b66623bda9974028",
    measurementId: "G-2FN2DK8L6G"
});
const db = getFirestore();


/**
 * Send information to the requested API with parameters. Returns a Promise object. 
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await sendToAPI(...)**
 * 
 * @param {string} url - URL of API
 * @param {object} params - Parameters to send
 * @returns {Promise<unknown>} Response data from API
 */
export const sendToAPI = (url, params) => {
    params.apiKey = _key;
    const data = fetch(url + '?' + new URLSearchParams(params)).then(response => response.json());
    return data;
}

/**
 * Perform a GET query search of the schema/collection, where attributes meet constraints specified.
 * The GET search that this method does performs a command similar to an SQL query, where the clauses
 * are **AND**ed together
 * 
 * @param {string} schema Name of the schema/collection to GET information from
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
 * @returns {QuerySnapshot<DocumentData>} All records that match the specified clauses
 */
export const getFromDB = async (schema, attributes, operators, values) => {
    // create a reference to the collection
    const ref = collection(db, schema);

    // create a query against the collection
    const whereClauses = [];
    // add WHERE clauses
    for (let i = 0; i < attributes.length; i++) {
        whereClauses.push(where(attributes[i], operators[i], values[i]));
    }
    const q = query(ref, ...whereClauses);
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

/**
 * POST information to the database. 
 * **NOTE: Ideally, if the unique identifier already exists, it should not overwrite.**
 * 
 * @param {string} schema Name of schema to POST information to
 * @param {string} id Unique identifier
 * @param {object} params JSON object literal of attributes to POST to the database
 */
export const postDB = async (schema, id, params) => {
    const dbRef = doc(db, schema, id);
    // POST to DB
    await setDoc(dbRef, params);
}

/**
 * Update/PUT information to database. To retrieve a specific id to update by, a GET request is done first.
 * For each ID retrieved, update the corresponding record.
 * 
 * @param {string} schema Name of schema to PUT information to
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
 * @param {object} params Attributes to update for a user record (can be a subset of all attributes)
 */
export const updateDB = async (schema, attributes, operators, values, params) => {
    // Perform GET request first to get the IDs
    const querySnapshot = await getFromDB(schema, attributes, operators, values);
    const ids = [];
    querySnapshot.forEach((doc) => ids.push(doc.id));

    // For each ID, update the corresponding record with the new parameters
    for(let i = 0; i < ids.length; i++){
        const dbRef = doc(db, schema, id);
        // PUT
        await updateDoc(dbRef, params);
    }
}

/**
 * DELETE a record from the database. To retrieve a specific id to update by, a GET request is done first.
 * For each ID retrieved, delete the corresponding record.
 * 
 * @param {string} schema Name of schema to DELETE information from
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
 */
export const deleteRecord = async (schema, attributes, operators, values) => {
    // Perform GET request to first get the IDs
    const querySnapshot = await getFromDB(schema, attributes, operators, values);
    const ids = [];
    querySnapshot.forEach((doc) => ids.push(doc.id));

    // For each ID, delete the corresponding record from the schema
    for(let i = 0; i < ids.length; i++) {
        const dbRef = doc(db, schema, id);
        // DELETE
        await deleteDoc(dbRef);
    }
}
