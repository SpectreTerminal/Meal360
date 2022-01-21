import express from 'express';
import bodyParser from 'body-parser';
import { authenticateUser, registerUser } from './loginBackend.js';
import { getPrefs, sendNewPrefs } from './dietMgmtBackend.js';


// port to listen on: 3001
const PORT = 3001;

// assign app to express
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// stack API endpoints here
// login endpoints
app.get("/login", async (req, res) => {
    res.json({
        status: await authenticateUser(req.body.email, req.body.password)
    });
});

app.post("/login", async (req, res) => {
    registerUser(req.body.email, req.body.password);
})

// diet mgmt endpoints
app.get("/dietMgmt", async (req, res) => {
    res.json({
        preferences: await getPrefs(req.body.email)
    });
});

app.post("/dietMgmt", async (req, res) => {
    res.json({
        preferences: await sendNewPrefs(req.body.params, req.body.email)
    });
});

// meal history endpoints

// meal plan generation endpoints

// recipe generation endpoints