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
	// get user preferences
	let dietInfo = await getPrefs(email);
	if (dietInfo !== null) {
		diet = dietInfo.diet;
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
		targetCalories,
	};

	let toReturn = null;
	await fetchMealPlan(email).then(async function (response) {
		if (response === null) {
			console.log("No meal plan found");
			// generate meal plan
			const mealplan = await sendToAPI(
				"https://api.spoonacular.com/mealplanner/generate",
				params
			);

			// store meal plan to the database
			const finalResponse = {
				email: email,
				mealsLeft: numDays,
				meals: mealplan,
			};
			storeMealPlan(finalResponse);
			toReturn = finalResponse;
			return finalResponse;
		} else if (response.mealsLeft === 0) {
			console.log("No meals left in meal plan");
			// generate meal plan
			const mealplan = await sendToAPI(
				"https://api.spoonacular.com/mealplanner/generate",
				params
			);

			// update record with new meal plan
			updateDB("meal-plan", ["email"], ["=="], [email], {
				meals: mealplan,
				mealsLeft: numDays,
			});
			// create meal plan object to return
			const finalResponse = {
				email: email,
				mealsLeft: numDays,
				meals: mealplan,
			};

			toReturn = finalResponse;
			return finalResponse;
		} else {
			console.log("still meals left");
			toReturn = response;
			return response;
		}
	});

	return toReturn;
};

/**
 * fetches the user's meal plan from the database
 *
 * @param {String} email - User's email address for the meal plan
 * @returns {Object} Response data from the database call
 */
export const fetchMealPlan = async (email) => {
	const response = await getFromDB("meal-plan", ["email"], ["=="], [email]);
	const docs = response.docs;
	if (docs.length === 0) {
		return null;
	}
	const records = docs[0].data();
	return records;
};

/**
 * stores the user's meal plan in the database
 *
 * @param {Object} mealplan - User's meal plan
 */
export const storeMealPlan = async (mealPlan) => {
	let randomID = () => {
		return Math.random().toString(36).substr(2, 10);
	};
	const output = randomID() + randomID();
	postDB("meal-plan", output, mealPlan);
	return;
};

/**
 * deletes the user's meal plan from the database
 *
 * @param {String} email - User's email address for the meal plan
 * @param {String} day - Day of the week to delete
 */
export const deleteMealPlanDay = async (email, day) => {
	let currmeal = await fetchMealPlan(email).then(function (response) {
		if (day === "monday") {
			let monday = response.meals.week.monday;
			updateMealHistory(["email"], ["=="], [email], { monday, day: "monday" });
			delete response.meals.week.monday;
		} else if (day === "tuesday") {
			let tuesday = response.meals.week.tuesday;
			updateMealHistory(["email"], ["=="], [email], {
				tuesday,
				day: "tuesday",
			});
			delete response.meals.week.tuesday;
		} else if (day === "wednesday") {
			let wednesday = response.meals.week.wednesday;
			updateMealHistory(["email"], ["=="], [email], {
				wednesday,
				day: "wednesday",
			});
			delete response.meals.week.wednesday;
		} else if (day === "thursday") {
			let thursday = response.meals.week.thursday;
			updateMealHistory(["email"], ["=="], [email], {
				thursday,
				day: "thursday",
			});
			delete response.meals.week.thursday;
		} else if (day === "friday") {
			let friday = response.meals.week.friday;
			updateMealHistory(["email"], ["=="], [email], { friday, day: "friday" });
			delete response.meals.week.friday;
		} else if (day === "saturday") {
			let saturday = response.meals.week.saturday;
			updateMealHistory(["email"], ["=="], [email], {
				saturday,
				day: "saturday",
			});
			delete response.meals.week.saturday;
		} else if (day === "sunday") {
			let sunday = response.meals.week.sunday;
			updateMealHistory(["email"], ["=="], [email], { sunday, day: "sunday" });
			delete response.meals.week.sunday;
		}
		updateDB("meal-plan", ["email"], ["=="], [email], {
			meals: response.meals,
			mealsLeft: response.mealsLeft - 1,
		});
	});
	return "success";
};
