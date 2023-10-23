const express = require("express");
const cors = require("cors");

const app = express();
const mysql = require("./mysql-connector");

// routes
const login = require("./routes/login");
const flights = require("./routes/flights");
const airports = require("./routes/airports");
const flightsDetails = require("./routes/flights-details");
const hasBookedBefore = require("./routes/has-booked-before");
const retrieveUserData = require("./routes/retrieve-user-data");
const createAccount = require("./routes/create-account");
const retrieveAdminData = require("./routes/retrieve-admin-data");
const updateFlightDelay = require("./routes/update-flight-delay");

app.use(express.json());
app.use(cors());

app.get("/flights", flights);
app.get("/airports", airports);
app.get("/flights-details", flightsDetails);
app.get("/login", login);
app.get("/has-booked-before", hasBookedBefore);
app.get("/retrieve-user-data", retrieveUserData);
app.get("/create-user", createAccount);
app.get("/retrieve-admin-data", retrieveAdminData);
app.get("/update-flight-delay", updateFlightDelay);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Closing connection to mysql");
	mysql.end(console.error);
	process.exit(0);
});
