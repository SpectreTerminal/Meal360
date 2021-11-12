import React from "react";
import Meal from "./Meal";

export default function RecipeList({ recipeData }) {
  console.log(recipeData)
  return (
    <main>
      <section className="nutrients">
        <h1>Recipes</h1>
      </section>
      <section className="meals">
        {recipeData.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}
