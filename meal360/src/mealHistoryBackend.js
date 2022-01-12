import { sendToDB } from "./extCommMod.js";

/**
 * Temporary stub method to get meal history from the database.
 * 
 * @param {object} userInfo User's information
 * @returns Meal history of the user
 */
export const getMealHistory = userInfo => sendToDB(null);