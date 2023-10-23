const mysql = require("../mysql-connector");

function handler(request, response) {
	const { emailAddress, password } = request.query;

	if (typeof emailAddress != "string" || typeof password != "string") {
		response.status(400).send("Email address or password is missing");
		return;
	}

	/**
	 * @param {"Admin" | "User"} checkingInTable
	 * @returns whether the response has been sent
	 */
	function checkLoginInTable(error, results, checkingInTable) {
		if (error) {
			console.error(error);
			response.status(500).send("Internal error occured");
			return true;
		}

		const user = results[0];
		if (typeof user == "undefined") {
			return false;
		}
		delete user.Password;
		user.isAdmin = checkingInTable == "Admin";

		response.status(200).send(user);
		return true;
	}

	mysql.query(
		"SELECT * FROM User WHERE Email_address = ? AND Password = ?",
		[emailAddress, password],
		(error, results) => {
			let isResponseSent = checkLoginInTable(error, results, "User");
			if (isResponseSent) return;

			mysql.query(
				"SELECT * FROM Admin WHERE Email_address = ? AND Password = ?",
				[emailAddress, password],
				(error, results) => {
					isResponseSent = checkLoginInTable(error, results, "Admin");
					if (isResponseSent) return;
					response.status(400).send("Wrong email address or password");
				}
			);
		}
	);
}

module.exports = handler;
