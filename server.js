const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");
const diag = require("./db/diagnostics.json");

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/feedback", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/pages/feedback.html"))
);

// GET for diagnostics
app.get("/api/diagnostics", (req, res) => res.json(diag));

// POST Route to store diagnostics
app.post("/api/diagnostics", (req, res) => {
	res.json(`${req.method} invalid form submission`);
	console.info(`${req.method} invalid form submission`);
});

// Get Route wildcard for 404 page
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname, "/public/pages/404.html"))
);

app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT}`)
);
