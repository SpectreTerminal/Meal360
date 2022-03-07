import express from 'express';
import bodyParser from 'body-parser';
import { authenticateUser, registerUser } from './loginBackend.js';
import { getPrefs, sendNewPrefs } from './dietMgmtBackend.js';
import { generateWeeklyMealPlan, deleteMealPlanDay } from './mealPlanGen.js';
import { generateRecipe, getRecipeInfo } from './recipeGen.js';
import { deleteMealHistory, getMealHistory, storeMeal, updateMealHistory } from './mealHistory.js';


// port to listen on: 3001
const PORT = 3001;

// assign app to express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// stack API endpoints here
// login endpoints
app.post("/login", async (req, res) => {
    res.json({
        status: await authenticateUser(req.body.email, req.body.password)
    });
});

app.post("/register", async (req, res) => {
    registerUser(req.body.email, req.body.password, req.body.name);
})

app.post("/update", async (req, res) => {
    updateUser(req.body.email, req.body.password, req.body.name);
})

// diet mgmt endpoints
app.post("/retrievePrefs", async (req, res) => {
    res.json({
        preferences: await getPrefs(req.body.email)
    });
});

app.post("/setPrefs", async (req, res) => {
    res.json({
        preferences: await sendNewPrefs(req.body.params, req.body.email)
    });
});


// meal history endpoints
app.post("/getMealHist", async (req, res) => {
    res.json({
        history: await getMealHistory(req.body.attributes, req.body.operators, req.body.values)
    });
});

app.post("/postMealHist", async (req, res) => {
    storeMeal(req.body.params);
});

app.put("/updateMealHist", async (req, res) => {
    updateMealHistory(req.body.attributes, req.body.operators, req.body.values, req.body.params);
});

app.delete("/delMealHist", async (req, res) => {
    deleteMealHistory(req.body.attributes, req.body.operators, req.body.values);
});

// meal plan generation endpoints
app.post("/genNewMP", async (req, res) => {
    res.json({
        mealplan: await generateWeeklyMealPlan(req.body.email)
    });
});

app.post("/delMealDay", async (req, res) => {
    res.json({
        result: await deleteMealPlanDay(req.body.email, req.body.day)
    });
});

// recipe generation endpoints
app.post("/genRecipe", async(req, res) => {
    res.json({
        recipes: await generateRecipe(req.body.diet, req.body.excludeIngredients, req.body.intolerances)
    });
});

app.post("/getRecipeInfo", async (req, res) => {
    res.json({
        recipeDetails: await getRecipeInfo(req.body.id)
    });
});

// server listener
app.listen(PORT, () => {
    console.log(`Node Server active at ${PORT}`);
});