import { sendToAPI } from "./extCommMod.js";

/**
 * Generates user's meal plan based on user's dietary preferences
 * using the Spoonacular Generate Meal Plan API call and returns the 
 * response data.
 * 
 * @param {String} timeFrame - Time frame for the meal plan
 * @param {String} diet - Diet type for the meal plan
 * @param {String} exclude - Excluded ingredients for the meal plan
 * @param {String} targetCalories - Target calories for the meal plan
 * @returns {Object} Response data from the API call
 */
export const generateMealPlan = async (timeFrame, diet, exclude, targetCalories) => {
    const params = {
        timeFrame,
        diet,
        exclude,
        targetCalories
    };

    const response = await sendToAPI("https://api.spoonacular.com/mealplanner/generate", params);
    return response;
}