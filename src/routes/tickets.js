const mysql = require("../mysql-connector");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
function handler(request, response) {
	response.status(500).send("/tickets endpoint is not done");
	return;

	mysql.query("", (error, results) => {
		if (error || !Array.isArray(results)) {
			console.error(error);
			response.status(500).send("Internal server error occured");
			return;
		}

		response
			.status(200)
			.setHeader("Content-Type", "application/json")
			.send(results);
	});
}

module.exports = handler;
