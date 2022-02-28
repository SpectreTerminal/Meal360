import { sendToAPI } from "./extCommMod.js";
import { postDB, getFromDB, updateDB } from "./extCommMod.js";
import { getPrefs } from "./dietMgmtBackend.js";

/**
 * Generates user's meal plan based on user's dietary preferences
 * using the Spoonacular Generate Meal Plan API call and returns the 
 * response data.
 * 
 * @param {String} email - User's email address for the meal plan 
 * @returns {Object} Response data from the API call
 */
export const generateWeeklyMealPlan = async (email) => {
    const timeFrame = "week";
    var diet;
    var exclude;
    var targetCalories;
    let dietInfo = await getPrefs(email);
    if (dietInfo !== null) {
        diet = dietInfo.dietType;
        exclude = dietInfo.exclude;
        targetCalories = dietInfo.targetCalories;
    } else {
        console.log("No preferences found for user: " + email);
        return null;
    }
    const numDays = 7;

    const params = {
        timeFrame,
        diet,
        exclude,
        targetCalories
    };

    const mealplan = await sendToAPI("https://api.spoonacular.com/mealplanner/generate", params);

    let mealAccount = fetchMealPlan(email).then(function(response) {
        if (response === null) {
            console.log("No meal history found");
            const finalResponse = {
            "email": email,
            "mealsLeft": numDays,
            "meals": []
            };
            
            finalResponse.meals = mealplan;
            storeMealPlan(finalResponse);
            return finalResponse;
        }

        else if (response.mealsLeft === 0) {
            console.log("No meals left");
            updateDB("meal-plan", ["email"], ["=="], [email], {"meals": mealplan, "mealsLeft": numDays});
            return response;
        }
        else {
            console.log("still meals left");
            return null;
        }
    });
}

/**
 * fetches the user's meal plan from the database
 * 
 * @param {String} email - User's email address for the meal plan
 * @returns {Object} Response data from the database call
 */
export const fetchMealPlan = async (email) => {
    const response = await getFromDB("meal-plan", ["email"], ["=="], [email]);
    const docs = response.docs;
    if(docs.length === 0) {
        return null;
    }
    const records = docs[0].data();
    return records;
}

/**
 * stores the user's meal plan in the database
 * 
 * @param {Object} mealplan - User's meal plan
 */
export const storeMealPlan = async (mealPlan) => {
    let randomID = () => { return Math.random().toString(36).substr(2, 10); }
    const output = randomID() + randomID(); 
    postDB("meal-plan", output, mealPlan);
}

/**
 * deletes the user's meal plan from the database
 * 
 * @param {String} email - User's email address for the meal plan
 * @param {String} day - Day of the week to delete
 */
export const deleteMealPlanDay = async (email, day) => {
    let currmeal = await fetchMealPlan(email).then(function(response) {
        // console.log(response.meals.week.monday);
        if (day === "monday") {
            delete response.meals.week.monday;
        } else if (day === "tuesday") {
            delete response.meals.week.tuesday;
        } else if (day === "wednesday") {
            delete response.meals.week.wednesday;
        } else if (day === "thursday") {
            delete response.meals.week.thursday;
        } else if (day === "friday") {
            delete response.meals.week.friday;
        } else if (day === "saturday") {
            delete response.meals.week.saturday;
        } else if (day === "sunday") {
            delete response.meals.week.sunday;
        }
        updateDB("meal-plan", ["email"], ["=="], [email], {"meals": response.meals, "mealsLeft": response.mealsLeft - 1});
    });
}