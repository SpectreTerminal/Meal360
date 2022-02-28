import { getFromDB, postDB } from "./extCommMod.js";

/**
 * Send the updated dietary preferences to the database. 
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await sendNewPrefs(...)**
 * 
 * @param {object} userParams User's new preferences
 * @param {string} id The user's identifier, usually their email.
 * @returns {object} User's current preferences
 */
export const sendNewPrefs = async (userParams, id) => {
    // POST information
    await postDB("dietPref", id, userParams);
    
    // return the information
    return await getPrefs(id);
}

/**
 * Get the user's dietary preferences.
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await getPrefs(...)**
 * 
 * @param {string} id User's email, the identifier
 * @returns {object} User's dietary preferences, as a JSON object literal
 */
export const getPrefs = async id => {
    const response = await getFromDB("dietPref", ["email"], ["=="], [id]);
    const docs = response.docs;
    if (docs.length === 0) {
        console.log("No preferences found for user: " + id);
        return null;
    }
    const data = docs[0].data();
    return data;
}
