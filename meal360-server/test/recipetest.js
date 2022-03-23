// recipe gen test
import { getRecipeInfo, generateRecipe } from "../recipeGen.js";

console.log("yo");
// 01


// getRecipeInfo normal
let num = 1697557;
const gr = await getRecipeInfo(num);
console.log("getRecipeInfo regular:", gr != null);

// 06 getRecipeInfo null
num = null;
let g2 = null;
try {
    g2 = await getRecipeInfo(num);
    console.log("getRecipeInfo null:", g2 == null);
} catch(err) {
    console.log("getRecipeInfo null:", true);
}