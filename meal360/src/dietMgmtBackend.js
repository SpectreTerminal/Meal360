import { getFromDB, postDB } from "./extCommMod.js";

/**
 * Send the updated dietary preferences to the database
 * 
 * @param {object} userParams User's new preferences
 * @param {string} id User's identifier
 * @returns User's current preferences
 */
export const sendNewPrefs = (userParams, id) => {
    postDB("dietPref", id, userParams);
    return getFromDB("dietPref", id);
}

/**
 * Get the user's dietary preferences
 * 
 * @param {string} id User's identifier
 * @returns {DocumentSnapshot<DocumentData>} Query response
 */
export const getPrefs = id => getFromDB("dietPref", id);


// // TEST Stub
// const testData = {
//     dietType: "vegan",
//     exclude: ["olives"],
//     targetCalories: 2500,
//     user: "test"
// }
// const response = sendNewPrefs(testData, "dietPref");
// console.log(response);