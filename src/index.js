const express = require("express");
const app = express();
const mysql = require("./mysql-connector");

// routes
const checkLogin = require("./routes/check-login");
const flights = require("./routes/flights");

app.use(express.json());

app.post("/check-login", checkLogin);
app.post("/flights", flights);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Closing connection to mysql");
	mysql.end(console.error);
	process.exit(0);
});
