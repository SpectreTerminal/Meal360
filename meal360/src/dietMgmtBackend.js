import { getFromDB, postDB } from "./extCommMod.js";

/**
 * Send the updated dietary preferences to the database. 
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await sendNewPrefs(...)**
 * 
 * @param {object} userParams User's new preferences
 * @param {string} id User's identifier
 * @returns {DocumentSnapshot<DocumentData>} User's current preferences
 */
export const sendNewPrefs = (userParams, id) => {
    postDB("dietPref", id, userParams);
    return getFromDB("dietPref", id);
}

/**
 * Get the user's dietary preferences.
 * Ensure that all calls made to this function use the **await** keyword.
 * Example: **let response = await getPrefs(...)**
 * 
 * @param {string} id User's identifier
 * @returns {DocumentSnapshot<DocumentData>} Query response
 */
export const getPrefs = id => getFromDB("dietPref", id);


// TEST Stub
// const testData = {
//     dietType: "vegan",
//     exclude: ["olives"],
//     targetCalories: 500,
//     user: "test"
// }
// await sendNewPrefs(testData, "dietPref");
// const r2 = await getPrefs("dietPref");
// console.log(r2.id);
// console.log(r2.data());