import { sendToAPI } from "./extCommMod.js";

/**
 * Searches for recipes from the Spoonacular API call and
 * based on the user's meal plan preferences and returns the
 * list of recipes and other response data. 
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


/**
 * Gets the recipe information from the Spoonacular API call and
 * based on the recipe id and returns the recipe information.
 * 
 * @param {String} id - Recipe id
 * @returns {Object} Response data from the API call
 */
 export async function getRecipeInfo(id) {
    const includeNutrition = true;
    const params = {
        includeNutrition
    };
    const response = await sendToAPI(`https://api.spoonacular.com/recipes/${id}/information`, params);
    return response;
}