import FileReader from 'fs';
import fetch from 'node-fetch';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";

// initialized information
const _key = FileReader.readFileSync('./apiKey.txt', 'utf8');
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
 * GET information from database.
 * 
 * @param {string} schema - Name of schema to get information from
 * @param {string} id - User's unique identifier to retrieve data from schema
 * @returns {DocumentSnapshot<DocumentData>} Query response
 */
export const getFromDB = async (schema, id) => {
    const dietPrefRef = doc(db, schema, id);

    // GET DB info
    const querySnapshot = await getDoc(dietPrefRef);
    // console.log(querySnapshot.id);
    // console.log(querySnapshot.data());
    return querySnapshot;
}

/**
 * POST information to database.
 * 
 * @param {string} schema - Name of schema to POST information to
 * @param {string} id - User's unique identifier
 * @param {object} params - Attributes to POST to the database
 */
export const postDB = async (schema, id, params) => {
    const dietPrefRef = doc(db, schema, id);
    
    // set DB (POST)
    await setDoc(dietPrefRef, params);
}

/**
 * Update/PUT information to database.
 * 
 * @param {string} schema - Name of schema to PUT information to
 * @param {string} id - User's unique identifier
 * @param {object} params - Attributes to update for a user record (can be a subset of all attributes)
 */
export const updateDB = async (schema, id, params) => {
    const dietPrefRef = doc(db, schema, id);
    
    // PUT
    await updateDoc(dietPrefRef, params);
}

/**
 * DELETE a record from the database.
 * 
 * @param {string} schema - Name of schema to DELETE information from
 * @param {string} id - User's unique identifier
 */
export const deleteRecord = async (schema, id) => {
    const dietPrefRef = doc(db, schema, id);

    // DELETE DB
    await deleteDoc(dietPrefRef);
}
