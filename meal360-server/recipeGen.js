import { sendToAPI } from "./extCommMod.js";

/**
 * generates recipe data from the Spoonacular API call and
 * based on the user's meal plan preferences and returns the
 * response data. 
 * 
 * @param {String} diet - Diet type for the meal plan
 * @param {String} excludeIngredients - Excluded ingredients for the meal plan
 * @param {String} intolerances - Intolerances for the meal plan
 * @returns {Object} Response data from the API call
 */
export async function generateRecipe(diet, excludeIngredients, intolerances) {
    const params = {
        diet,
        excludeIngredients,
        intolerances
    };
    const response = await sendToAPI("https://api.spoonacular.com/recipes/complexSearch", params);
    return response;
}
