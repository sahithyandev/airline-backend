const mysql = require("../mysql-connector");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
function handler(request, response) {
	// TODO bookedSeats are not included in the response yet
	mysql.query(
		`SELECT
			FS.Flight_ID AS flightId,
			AM.Model AS model,
			AM.Economy_seat_count,
			AM.Business_seat_count,
			AM.Platinum_seat_count
		FROM
			\`Flight Schedule\` AS FS
		LEFT JOIN
			Aircraft AS A ON FS.Aircraft_ID = A.Aircraft_ID
		LEFT JOIN
			Aircraft_Models AS AM ON A.Model_ID = AM.Model_ID`,
		(error, results) => {
			if (error || !Array.isArray(results)) {
				console.error(error);
				response.status(500).send("Internal server error occured");
				return;
			}

			response
				.status(200)
				.setHeader("Content-Type", "application/json")
				.send(results);
		}
	);
}

module.exports = handler;
