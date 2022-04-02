import { deleteRecord } from "../extCommMod.js";
import {
  getMealHistory,
  deleteMealHistory,
  updateMealHistory,
  storeMeal,
} from "../mealHistory.js";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// getMealHistory tests
let notworkingMeal = getMealHistory(["email"], ["=="], [""]).then(function (
  response
) {
  console.log(
    "No Meal Found! if Null returned, True expected:",
    response == null
  );
});

let WorkingMeal = getMealHistory(["email"], ["=="], ["a@a.com"]).then(function (
  response
) {
  console.log(
    "Meal Found! if Json object returned, True expected:",
    response != null
  );
});

await sleep(1000);

// storeMeal tests
let mealCheckBefore = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if meal exists before storing. if Null returned, True expected:",
    response == null
  );
});

await sleep(1000);

storeMeal({ email: "TestCase@gmail.com", mealData: ["meal1", "meal2"] });

await sleep(1000);

let mealCheckAfter = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if meal exists after storing. If Json object returned, True expected:",
    response != null
  );
});

// // deleteMealHistory tests
let mealCheckBeforeDelete = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking number of meals before deleting. if correct number, True expected:",
    response[0].mealData.length == 2
  );
});

await sleep(1000);

deleteMealHistory(["email"], ["=="], ["TestCase@gmail.com", 1]);

await sleep(1000);

let mealCheckAfterDelete = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if number of meals after deleting. if correct number, True expected:",
    response[0].mealData.length == 1
  );
});

await sleep(1000);

// // updateMealHistory tests
let mealCheckBeforeUpdate = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking number of meals before updating. if correct number, True expected:",
    response[0].mealData.length == 1
  );
});

await sleep(1000);

updateMealHistory(["email"], ["=="], ["TestCase@gmail.com"], {
  meal: "pizza",
  day: "meal",
});

await sleep(1000);

let mealCheckAfterUpdate = getMealHistory(
  ["email"],
  ["=="],
  ["TestCase@gmail.com"]
).then(function (response) {
  console.log(
    "Checking number of meals after updating. if correct number, True expected:",
    response[0].mealData.length == 2
  );
});

await sleep(1000);

deleteRecord("meal-history", ["email"], ["=="], ["TestCase@gmail.com"]);
