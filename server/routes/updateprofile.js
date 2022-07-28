const express = require('express');
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	User.findByIdAndUpdate(
		req.body._id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		},
		function(err, user) {
			if (err) {
				console.log(err)
			} else {
				res.status(500).send({ message: "User details updated." });
				console.log("Updated User : ", user);
			}
		})
});

router.post("/update-password", async (req, res) => {
	try {
		//SALT password for new passwords to compare
		const SALT = await bcrypt.genSalt(Number(process.env.SALT))

		//Current User's Email
		const user = await User.findOne({email: req.body.email});

		//Hash new passwords
		const new_pass = await bcrypt.hash(req.body.new_password, SALT);
		const new_pass_confirm = await bcrypt.hash(req.body.new_password_confirm, SALT);

		const curr_pass_res = await bcrypt.compare(
			req.body.current_password,
			user.password
		);

		if (new_pass === new_pass_confirm && curr_pass_res)
		{
			const {error} = validate(req.body);

			if (error)
				return res.status(500).send({message: error.details[0].message});

			User.findByIdAndUpdate(req.body._id, {
					password: new_pass
				},
				function(err, user) {
					if (err) {
						console.log(err)
					} else {
						res.status(500).send({ message: "User Password Successfully Updated" });
					}
				})
		}
		else
		{
			res.status(500).send({ message: "Passwords do not match or incorrect current password given." });
		}
	}
	catch (e) {
		return e;
	}
});

router.post("/add-authorized-user", async (req, res) => {
	if (req.body.authorized_email === req.body.email)
		return res.status(500).send({ message: "Emails are the same."});

	const authorized_user = await User.findOne({email: req.body.authorized_email});

	User.findOneAndUpdate(
		{email: req.body.email},
		{
			$addToSet: { users_authorized: authorized_user}
		},
		function(err, user) {
			if (err) {
				console.log(err)
			} else {
				res.status(500).send({ message: "User has been authorized or user is already authorized." });
				console.log("Authorized user added or already exists in authorized users.");
			}
		})
});

router.post("/get-authorized-users", async (req, res) => {
	const authorized_users_ids = await User.find({email: req.body.email}).select('users_authorized');
	console.log(authorized_users_ids);
});

const validate = (data) => {
	const schema = Joi.object({
		new_password: passwordComplexity().required().label("New Password"),
		_id: Joi.string().required().label("ID"),
	}).options({allowUnknown: true});
	return schema.validate(data);
};

module.exports = router;