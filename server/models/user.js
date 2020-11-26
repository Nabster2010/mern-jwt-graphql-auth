const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			min: 8,
			max: 32,
		},
	},
	{ timestamps: true }
);

module.exports = User = mongoose.model('User', userSchema);
