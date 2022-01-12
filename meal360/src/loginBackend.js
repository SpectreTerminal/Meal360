import { sendToAPI, sendToDB } from "./extCommMod.js";

/**
 * Temporary stub method to get authentication from the database.
 * 
 * @param {object} login Login information
 * @returns ???
 */
export const getAuthentication = (login) => {
    return sendToDB(null);
}

// Test stub method
export const genMealPlan = async () => {
    const genMealPlanURL = 'https://api.spoonacular.com/mealplanner/generate';

    // note: no API key, that's the fetch test's responsibility
    const params = {
        headers: {
            'Content-Type': 'application/json'
        },
        timeFrame: 'day',
        targetCalories: 2000,
        diet: 'vegetarian'
        // exclude: ['shellfish', 'olives']
    }

    let response = await sendToAPI(genMealPlanURL, params);
    let meals = response.meals;
    for(let i = 0; i < meals.length; i++){
        console.log(meals[i]);
    }
}

genMealPlan();