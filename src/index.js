const express = require("express");
const cors = require("cors");

const app = express();
const mysql = require("./mysql-connector");

// routes
const login = require("./routes/login");
const flights = require("./routes/flights");
const airports = require("./routes/airports");
const flightsDetails = require("./routes/flights-details");
const isRegisteredUser = require("./routes/is-registered-user");
const retrieveUserData = require("./routes/retrieve-user-data");

app.use(express.json());
app.use(cors());

app.get("/login", login);
app.get("/flights", flights);
app.get("/airports", airports);
app.get("/flights-details", flightsDetails);
app.post("/is-registered-user", isRegisteredUser);
app.post("/retrieve-user-data", retrieveUserData);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Closing connection to mysql");
	mysql.end(console.error);
	process.exit(0);
});
