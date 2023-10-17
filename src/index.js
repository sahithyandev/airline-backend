const express = require("express");
const app = express();
const mysql = require("./mysql-connector");

// routes
const checkLogin = require("./routes/check-login");

app.use(express.json());

app.post("/check-login", checkLogin);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
	console.log("Closing connection to mysql");
	mysql.end(console.error);
	process.exit(0);
});
