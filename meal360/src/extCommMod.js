import FileReader from 'fs';
import fetch from 'node-fetch';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";

// TODO: Note: Filepath changes depending on current directory... might need a way to improve this.
// Is there a way to make this privately accessible?
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
// TODO: When user creates account, an ID is generated for them. This ID is used as the identifier for their dietary preferences when POSTing, PUTting, GETting or DELETing

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
 * @param {string} schema
 * @param {string} id
 * @returns {DocumentSnapshot<DocumentData>} Query response
 */
export const getFromDB = async (schema, id) => {
    // TODO db, schema, ID
    // example: doc(db, "dietPref", "dietPref2");
    const dietPrefRef = doc(db, schema, id);

    // GET DB info
    const querySnapshot = await getDoc(dietPrefRef);
    console.log(querySnapshot.id);
    console.log(querySnapshot.data());
    return querySnapshot;
}

/**
 * TODO what about registration?
 * @param {string} schema 
 * @param {string} id 
 * @param {object} params 
 */
export const postDB = async (schema, id, params) => {
    // TODO db, schema, ID
    const dietPrefRef = doc(db, schema, id);
    
    // set DB (POST)
    // await setDoc(dietPrefRef, {
    //     dietType: "vegetarian",
    //     exclude: ["olives"],
    //     targetCalories: 2500,
    //     user: "sumOthrGuy"
    // });
    await setDoc(dietPrefRef, params);
}

/**
 * 
 * @param {string} schema 
 * @param {string} id 
 * @param {object} params 
 */
export const updateDB = async (schema, id, params) => {
    // TODO db, schema, ID
    const dietPrefRef = doc(db, schema, id);

    // PUT DB
    // await updateDoc(dietPrefRef, {
    //     dietType: "meat only lol",
    //     targetCalories: 10000
    // });
    await updateDoc(dietPrefRef, params);
}

export const deleteRecord = async (schema, id) => {
    // TODO db, schema, ID
    const dietPrefRef = doc(db, schema, id);

    // DELETE DB
    // await deleteDoc(doc(db, "dietPref", "dietPref"));
    await deleteDoc(dietPrefRef);
}


// const dietPrefRef = doc(db, "dietPref", "dietPref2");
// await setDoc(dietPrefRef, {
//         dietType: "vegetarian",
//         exclude: ["olives"],
//         targetCalories: 2500,
//         user: "sumOthrGuy"
//     });

// await updateDoc(dietPrefRef, {
//         dietType: "meat only lol",
//         targetCalories: 10000
//     });