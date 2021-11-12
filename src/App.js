import React, { useState } from "react";
import MealList from "./MealList";
import RecipeList from "./RecipeList";

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const [recipeData, setRecipeData] = useState(null);
  const [ingredientsList, setIngredients] = useState('apples,+flour,+sugar');

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=9a878085a2e042e3a954c4f18d8ca637&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function getRecipeData() {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=9a878085a2e042e3a954c4f18d8ca637&ingredients=${ingredientsList}&number=3`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange2(e) {
    setIngredients(e.target.value);
  }

  return (
    <div className="App">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>

{mealData && <MealList mealData={mealData} />}

        <input
          type="text"
          placeholder="Ingredients (e.g. apples, flour, sugar)"
          onChange={handleChange2}
        />
        <button onClick={getRecipeData}>Get Recipe</button>
      </section>

      

      {recipeData && <RecipeList recipeData={recipeData} />}
    </div>
  );
}

export default App;
