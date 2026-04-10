import express from "express";      // Framework to build server
import axios from "axios";          // To make API requests

const app = express();
const port = 3000;

// Base API URL for your project
const API_url = "https://aes.shenlu.me/api/";

// Serve static files (CSS, images, etc.) from the "public" folder
app.use(express.static("public"));


// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    // Initial page load → no data yet
    res.render("index.ejs", { 
        content: "Waiting for data...", 
        view: null 
    });
});


// ================= RANDOM SPECIES =================
app.get("/random", async (req, res) => {
    try {
        // Fetch random species from API
        const result = await axios.get(API_url + "/v1/random");

        // Send data to EJS with "random" view
        res.render("index.ejs", { 
            content: result.data, 
            view: "random"
        });

    } catch (error) {
        // Handle API error
        res.status(404).send('Please try again.');
        console.error(error);
    }
});


// ================= ALL SPECIES =================
app.get("/species", async (req, res) => {
    try {
        const result = await axios.get(API_url + "/v1/species");

        res.render("index.ejs", {
            content: result.data,   // Array of species
            view: "species"
        });

    } catch (error) {
        res.sendStatus(404);
        console.error(error);
    }
});


// ================= SPECIES COUNT =================
app.get("/speciescount", async (req, res) => {
    try {
        const result = await axios.get(API_url + "/v1/speciescount");

        res.render("index.ejs", {
            content: result.data,   // Contains count
            view: "speciesCount"
        });

    } catch (error) {
        res.sendStatus(404);
        console.error(error);
    }
});


// ================= COUNTRY LIST =================
app.get("/country", async (req, res) => {
    try {
        const result = await axios.get(API_url + "/v1/country");

        res.render("index.ejs", {
            content: result.data,   // List of country codes
            view: "country"
        });

    } catch (error) {
        console.error(error);
    }
});


// ================= COUNTRY COUNT =================
app.get("/countrycount", async (req, res) => {
    try {
        const result = await axios.get(API_url + "/v1/countrycount");

        res.render("index.ejs", {
            content: result.data,   // Contains count
            view: "countryCount"
        });

    } catch (error) {
        res.sendStatus(404);
        console.error(error);
    }
});


// ================= REDIRECT TO HOME =================
app.get("/home", (req, res) => {
    res.redirect("/");   // Redirects user back to homepage
});


// ================= START SERVER =================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});