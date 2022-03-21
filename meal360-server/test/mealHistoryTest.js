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
let workingMeal = getMealHistory(["email"], ["=="], [""]).then(function (
  response
) {
  console.log(
    "No Meal Found! if Null returned, True expected:",
    response == null
  );
});

let notWorkingMeal = getMealHistory(["email"], ["=="], ["a@a.com"]).then(
  function (response) {
    console.log(
      "Meal Found! if Json object returned, True expected:",
      response != null
    );
  }
);

// storeMeal tests
let mealCheckBefore = getMealHistory(["email"], ["=="], [""]).then(function (
  response
) {
  console.log(
    "Checking if meal exists before storing. if Null returned, True expected:",
    response == null
  );
});

await sleep(1000);

storeMeal({ email: "abcd@gmail.com", mealData: { meal: "chicken" } });

await sleep(1000);

let mealCheckAfter = getMealHistory(["email"], ["=="], ["abcd@gmail.com"]).then(
  function (response) {
    console.log(
      "Checking if meal exists after storing. If Json object returned, True expected:",
      response != null
    );
  }
);

// deleteMealHistory tests
let mealCheckBeforeDelete = getMealHistory(["email"], ["=="], [""]).then(
  function (response) {
    console.log(
      "Checking if meal exists before deleting. If Null returned, True expected:",
      response == null
    );
  }
);

await sleep(1000);

deleteMealHistory(["email"], ["=="], ["abcd@gmail.com"]);

await sleep(1000);

let mealCheckAfterDelete = getMealHistory(
  ["email"],
  ["=="],
  ["abcd@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if meal exists after deleting. If Null returned, True expected:",
    response == null
  );
});

await sleep(1000);

// updateMealHistory tests
storeMeal({ email: "abcd@gmail.com", mealData: { meal: "chicken" } });

await sleep(1000);

let mealCheckBeforeUpdate = getMealHistory(
  ["email"],
  ["=="],
  ["abcd@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if meal exists before updating. if mealData value is same as before, True expected:",
    response[0].mealData.meal == "chicken"
  );
});

await sleep(1000);

updateMealHistory(["email"], ["=="], ["abcd@gmail.com"], { meal: "pizza" });

await sleep(1000);

let mealCheckAfterUpdate = getMealHistory(
  ["email"],
  ["=="],
  ["abcd@gmail.com"]
).then(function (response) {
  console.log(
    "Checking if meal exists after updating. If mealData value is changed to new one, True expected:",
    response[0].mealData.meal == "pizza"
  );
});

await sleep(1000);

deleteMealHistory(["email"], ["=="], ["abcd@gmail.com"]);
