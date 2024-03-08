const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
	console.log("get diagnostics");
	// TODO: Logic for sending all the content of db/diagnostics.json
	readFromFile("./db/diagnostics.json")
		.then((data) => res.json(JSON.parse(data)))
		.catch((err) => res.status(500).json("Error reading file"));
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
	console.log("Test bad request", req);
	// TODO: Logic for appending data to the db/diagnostics.json file
	const newDiagnostic = { ...req.body, error_id: uuidv4() };
	readAndAppend(newDiagnostic, "./db/diagnostics.json");
	res.json(`Diagnostics passed for ${newDiagnostic.error_id}`);
});

module.exports = diagnostics;
