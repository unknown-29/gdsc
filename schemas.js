const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: String,
	hobby: [String],
});
const MyUsers = mongoose.model('MyUsers', UserSchema);
module.exports = MyUsers;
