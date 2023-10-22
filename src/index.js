const express = require("express");
const cors = require("cors");

const app = express();
const mysql = require("./mysql-connector");

// routes
const checkLogin = require("./routes/check-login");
const flights = require("./routes/flights");
const airports = require("./routes/airports");
const flightsDetails = require("./routes/flights-details");

app.use(express.json());
app.use(cors());

app.post("/check-login", checkLogin);
app.post("/flights", flights);
app.post("/airports", airports);
app.post("/flights-details", flightsDetails);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Closing connection to mysql");
	mysql.end(console.error);
	process.exit(0);
});
