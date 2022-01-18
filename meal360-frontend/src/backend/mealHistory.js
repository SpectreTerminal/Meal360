import { postDB, getFromDB, updateDB, deleteRecord } from "./extCommMod";

/**
 * Stores user's meal history in the database.
 * 
 * @param {string} id User's unique identifier
 * @param {object} meal Meal to be stored
 * @returns {DocumentSnapshot<DocumentData>} Query response
 * @throws {Error} If the user's meal history is not found
 */
export const storeMeal = async (id, meal) => {
    postDB("mealHistory", id, meal);
    return getFromDB("mealHistory", id);
}

/**
 * Retrieves user's meal history from the database.
 * 
 * @param {string} id User's unique identifier
 * @returns {DocumentSnapshot<DocumentData>} Query response
 * @throws {Error} If the user's meal history is not found
 */
export const getMealHistory = async (id) => {
    return getFromDB("mealHistory", id);
}

/**
 * Delete a user's meal history from the database.
 * 
 * @param {string} id User's unique identifier
 * @returns {DocumentSnapshot<DocumentData>} Query response
 * @throws {Error} If the user's meal history is not found
*/
export const deleteMealHistory = async (id) => {
    return deleteRecord("mealHistory", id);
}

/**
 * Updates user's meal history in the database.
 * 
 * @param {string} id User's unique identifier
 * @param {object} meal Meal to be updated
 * @returns {DocumentSnapshot<DocumentData>} Query response
 * @throws {Error} If the user's meal history is not found
 */
export const updateMealHistory = async (id, meal) => {
    return updateDB("mealHistory", id, meal);
}