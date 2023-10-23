const mysql = require("../mysql-connector");

/**
 * @typedef NewUserDetailsObj
 * @prop {string} name
 * @prop {string} address
 * @prop {string} email
 * @prop {string} password
 * @prop {string} birthday
 * @prop {string} NIC
 * @prop {string} phoneNumber
 * @prop {string} passport
 */

/**
 * @param {import("express").Request<import("express-serve-static-core").RouteParameters<"create-user">, unknown, NewUserDetailsObj>} request
 * @param {import("express").Response} response
 */
async function handler(request, response) {
	const {
		name,
		address,
		email,
		password,
		birthday,
		NIC,
		phoneNumber,
		passport,
	} = request.query;

	if (
		typeof name != "string" ||
		typeof address != "string" ||
		typeof email != "string" ||
		typeof password != "string" ||
		typeof birthday != "string" ||
		typeof NIC != "string" ||
		typeof phoneNumber != "string" ||
		typeof passport != "string"
	) {
		response.status(400).send("Not all required fields are given");
		return;
	}

	const userId = await new Promise((resolve, reject) => {
		mysql.query("SELECT COUNT(*) FROM User", (error, count) => {
			if (error) {
				console.error(error);
				reject("Internal server error occured");
				return;
			}
			console.log("user total count", count);
			if (typeof count != "number") {
				throw new Error(
					`count is expected to be a number, got ${count} instead`
				);
			}
			resolve((count + 1).toString().padStart(4, "0"));
		});
	});

	mysql.query(
		"INSERT INTO User (User_ID, Email_address, Password, Name, Address, Birthday, NIC, Phone_number, Passport_number, Membership_type, Travel_Count, Role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
			userId,
			email,
			password,
			name,
			address,
			birthday,
			NIC,
			phoneNumber,
			passport,
			// TODO
			"Guest",
			// TODO
			0,
			// TODO
			undefined,
		]
	);
}
module.exports = handler;
