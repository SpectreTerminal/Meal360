import { postDB, getFromDB, updateDB, deleteRecord } from "./extCommMod.js";

/**
 * Stores user's meal history in the database.
 * 
 * @param {object} params JSON object literal of attributes of the meal
 */
export const storeMeal = async (params) => {
    let randomID = () => { return Math.random().toString(36).substr(2, 10); }
    const output = randomID() + randomID();
    postDB("meal-history", output, params);
}

/**
 * Retrieves user's meal history from the database.
 * 
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
 * @returns {DocumentSnapshot<DocumentData>} All records that match the specified clauses
 * @throws {Error} If the user's meal history is not found
 */
export const getMealHistory = async (attributes, operators, values) => {
    const response = await getFromDB("meal-history", attributes, operators, values);
    const docs = response.docs;
    if(docs.length === 0) {
        console.log("No meal history found");
        return null;
    }
    const records = [];
    for (let index = 0; index < docs.length; index++) {
        records[index] = docs[index].data(); 
    }
    return records;
}

/**
 * Delete a user's meal history from the database.
 * 
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
*/
export const deleteMealHistory = async (attributes, operators, values) => {
    deleteRecord("meal-history", attributes, operators, values);
}

/**
 * Updates user's meal history in the database.
 * 
 * @param {string[]} attributes List of attributes to search on
 * @param {string[]} operators List of operators (ex. ==, <=, <, etc.)
 * @param {any[]} values List of values of attributes
 * @param {object} params Attributes to update for the user's meal
 */
export const updateMealHistory = async (attributes, operators, values, params) => {
    let currMeal = await getMealHistory(attributes, operators, values);
    if (currMeal === null) {
        console.log("No meal history found");
        const email = { email: values[0] };
        let mealData = { 
            mealData : params 
        };
        let finalRes = Object.assign(email, mealData);
        // console.log(finalRes);
        storeMeal(finalRes);
        return;
    } else {
        console.log("Meal history found");
        let finalRes = Object.assign(currMeal[0].mealData, params);
        currMeal[0].mealData = finalRes;
        // console.log(currMeal[0].mealData);
        updateDB("meal-history", attributes, operators, values, currMeal[0]);
        return;
    }
}