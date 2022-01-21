import { sendToAPI } from "./extCommMod";

/**
 * generates recipe data from the Spoonacular API call and
 * based on the user's meal plan preferences and returns the
 * response data. 
 * 
 * @param {String} diet - Diet type for the meal plan
 * @param {String} excludeIngredients - Excluded ingredients for the meal plan
 * @param {String} intolerances - Intolerances for the meal plan
 * @param {String} url - Spoonacular API URL
 * @returns {Object} Response data from the API call
 */
function generateRecipe(diet, excludeIngredients, intolerances, url) {
    const params = {
        diet,
        excludeIngredients,
        intolerances
    };
    const response = sendToAPI(url, params);
    return response;
}

export { generateRecipe }; // export the function