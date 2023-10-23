const mysql = require("../mysql-connector");

/**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 */
function handler(request, response) {
	// TODO bookedSeats are not included in the response yet

	const flightId = request.query.flightId;

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
			Aircraft_Models AS AM ON A.Model_ID = AM.Model_ID
		WHERE ? OR FS.Flight_ID = ?`,
		[flightId == undefined, flightId],
		(error, results) => {
			if (error || !Array.isArray(results)) {
				console.error(error);
				response.status(500).send("Internal server error occured");
				return;
			}

			if (results.length == 0) {
				response.status(500).send("No such flight is found");
				return;
			}

			// TODO THIS SECTION IS A PLACEHOLDER
			for (let i = 0; i < results.length; i++) {
				results[i].bookedSeats = {
					Economy: [5, 10, 15, 20],
					Business: [2, 7, 12],
					Platinum: [1, 3],
				};
			}

			response
				.status(200)
				.setHeader("Content-Type", "application/json")
				// if flightId is provided, return matching flight only,
				// otherwise return all flights
				.send(flightId == undefined ? results : results[0]);
		}
	);
}

module.exports = handler;
