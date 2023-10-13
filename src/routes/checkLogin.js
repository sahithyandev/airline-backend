const mysql = require("../mysql-connector");

function checkLogin(request, response) {
	const { email_address, password } = request.body;

	if (typeof email_address != "string" || typeof password != "string") {
		response.status(400).send("Email address or password is missing");
		return;
	}

	/**
	 * @returns whether the response has been sent
	 */
	function checkLoginInTable(error, results) {
		if (error) {
			console.error(error);
			response.status(500).send("Internal error occured");
			return true;
		}

		const user = results[0];
		if (typeof user != "undefined") {
			delete user.Password;
			user.isAdmin = false;

			response.status(200).send(user);
			return true;
		}

		return false;
	}

	mysql.query(
		"SELECT * FROM Admin WHERE Email_address = ? AND Password = ?",
		[email_address, password],
		(error, results) => {
			let isResponseSent = checkLoginInTable(error, results);
			if (isResponseSent) return;

			mysql.query(
				"SELECT * FROM User WHERE Email_address = ? AND Password = ?",
				[email_address, password],
				(error, results) => {
					isResponseSent = checkLoginInTable(error, results);
					if (isResponseSent) return;
					response.status(400).send("Wrong email address or password");
				}
			);
		}
	);
}
exports.checkLogin = checkLogin;