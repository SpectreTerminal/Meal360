import { sendToAPI } from "./extCommMod";

/**
 * Generates user's meal plan based on user's dietary preferences
 * using the Spoonacular Generate Meal Plan API call and returns the 
 * response data.
 * 
 * @param {String} timeFrame - Time frame for the meal plan
 * @param {String} diet - Diet type for the meal plan
 * @param {String} exclude - Excluded ingredients for the meal plan
 * @param {String} targetCalories - Target calories for the meal plan
 * @param {String} url - Spoonacular API URL
 * @returns {Object} Response data from the API call
 */
function generateMealPlan(timeFrame, diet, exclude, targetCalories, url) {
    const params = {
        timeFrame,
        diet,
        exclude,
        targetCalories
    };
    const response = sendToAPI(url, params);
    return response;
}

export { generateMealPlan }; // export the function

