import {getFromDB, sendToAPI} from "../extCommMod.js";

// TODO Test 01: Send valid API request
const timeFrame = "week";
var diet = "vegan";
var exclude = ["peanuts", "shellfish"];
var targetCalories = 2650;

const params = {
    timeFrame,
    diet,
    exclude,
    targetCalories
};

let result = await sendToAPI("https://api.spoonacular.com/mealplanner/generate", params);

console.log("Test 1 result:");
console.log(result);

// TODO Test 02: Send request with invalid URL - should return exception, since returned object is HTML 404
console.log("\nTest 2 result:");
try{
    result = await sendToAPI("https://api.spoonacular.com/wronglink/invalid", params);
    console.log(result);
}
catch(err){
    console.log("Error retrieving data.");
}

// TODO Test 03: Send request with invalid payload - these are client errors, so a 400-status code should be returned
console.log("\nTest 3 result:");
result = await sendToAPI("https://api.spoonacular.com/recipes/findByNutrients", {});
console.log(result.code >= 400 && result.code < 500);
result = await sendToAPI("https://api.spoonacular.com/recipes/findByNutrients", {randomValue: 150, oops: "hello"});
console.log(result.code >= 400 && result.code < 500);

// TODO Test 04: getDB with pre-existing email
let email = "eric@gmail.com"
let response = await getFromDB("dietPref", ['email'], ['=='], [email]);
let docs = response.docs;
console.log("\nTest 4 results:");
console.log("Email " + email + " exists: " + (docs.length > 0));
const prefs = docs[0].data();
console.log(prefs);

// TODO Test 05: getDB with non-existent email
email = "no-email@nope.com"
response = await getFromDB("dietPref", ['email'], ['=='], [email]);
docs = response.docs;
console.log("\nTest 5 results:");
console.log("Email " + email + " does not exist: " + (docs.length === 0));