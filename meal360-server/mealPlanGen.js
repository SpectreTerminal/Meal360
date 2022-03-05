import { sendToAPI, postDB, getFromDB, updateDB } from "./extCommMod.js";
import { getPrefs } from "./dietMgmtBackend.js";
import { updateMealHistory } from "./mealHistory.js";

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

    let toReturn = null
    let mealAccount = await fetchMealPlan(email).then(function(response) {
        
        if (response === null) {
            console.log("No meal history found");
            const finalResponse = {
            "email": email,
            "mealsLeft": numDays,
            "meals": []
            };
            
            finalResponse.meals = mealplan;
            storeMealPlan(finalResponse);
            toReturn = finalResponse;
            return finalResponse;
        }

        else if (response.mealsLeft === 0) {
            console.log("No meals left");
            updateDB("meal-plan", ["email"], ["=="], [email], {"meals": mealplan, "mealsLeft": numDays});
            toReturn = response; 
            return response;
        }
        else {
            console.log("still meals left");
            toReturn = response
            return response;
        }
    });

    return toReturn
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
    return;
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
            let monday = response.meals.week.monday;
            updateMealHistory(["email"], ["=="], [email], {monday});
            delete response.meals.week.monday;
        } else if (day === "tuesday") {
            let tuesday = response.meals.week.tuesday;
            updateMealHistory(["email"], ["=="], [email], {tuesday});
            delete response.meals.week.tuesday;
        } else if (day === "wednesday") {
            let wednesday = response.meals.week.wednesday;
            updateMealHistory(["email"], ["=="], [email], {wednesday});
            delete response.meals.week.wednesday;
        } else if (day === "thursday") {
            let thursday = response.meals.week.thursday;
            updateMealHistory(["email"], ["=="], [email], {thursday});
            delete response.meals.week.thursday;
        } else if (day === "friday") {
            let friday = response.meals.week.friday;
            updateMealHistory(["email"], ["=="], [email], {friday});
            delete response.meals.week.friday;
        } else if (day === "saturday") {
            let saturday = response.meals.week.saturday;
            updateMealHistory(["email"], ["=="], [email], {saturday});
            delete response.meals.week.saturday;
        } else if (day === "sunday") {
            let sunday = response.meals.week.sunday;
            updateMealHistory(["email"], ["=="], [email], {sunday});
            delete response.meals.week.sunday;
        }
        updateDB("meal-plan", ["email"], ["=="], [email], {"meals": response.meals, "mealsLeft": response.mealsLeft - 1});
    });
    return;
}