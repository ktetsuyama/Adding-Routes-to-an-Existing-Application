const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/api/diagnostics", (req, res) => {
	console.log("get diagnostics");
	// TODO: Logic for sending all the content of db/diagnostics.json
	readFromFile("../db/diagnostics.json")
		.then((data) => res.json(JSON.parse(data)))
		.catch((err) => res.status(500).json("Error reading file"));
});

// POST Route for a error logging
diagnostics.post("/api/diagnostics", (req, res) => {
	console.log("Test bad request", req);
	// TODO: Logic for appending data to the db/diagnostics.json file
	const newDiagnostic = req.body;
	readAndAppend(newDiagnostic, "./db/diagnostics.json")
		.then(() => res.status(201).json("Diagnostic data logged"))
		.catch((err) => res.status(500).json("Error logging diagnostic data"));
});

module.exports = diagnostics;
