const express = require('express');
const mongoose = require('mongoose');
const MyUsers = require('./schemas.js');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
app.use(express.json());
app.all('/', (req, res) => {
	res.end('home');
});
app.get('/getuser', async (_, res) => {
	const user = await MyUsers.find({});
	// console.log(user);
	res.json(user);
});
app.put('/newHobby/:name', async (req, res) => {
	const newHobby = req.body.newHobby;
	const name = req.params['name'];
	const user = await MyUsers.findOne({ name });
	console.log(user.hobby);
	user.hobby.push(newHobby);
	await user.save();
	const users = await MyUsers.find({});
	res.json(users);
});
app.delete('/deleteHobby/:name', async (req, res) => {
	const deleteHobby = req.body.deleteHobby;
	const name = req.params['name'];
	const user = await MyUsers.findOne({ name });
	console.log(user.hobby);
	user.hobby.forEach((hobby, index) => {
		if (hobby === deleteHobby) {
			user.hobby.splice(index, index + 1);
		}
	});
	await user.save();
	const users = await MyUsers.find({});
	res.json(users);
});
app.delete('/deleteuser/:name', async (req, res) => {
	await MyUsers.deleteOne({ 'name': req.params['name'] });
	const users = await MyUsers.find({});
	res.json(users);
});
app.post('/postuser', async (req, res) => {
	const name = req.body.name;
	const hobbies = req.body.hobby;
	const user = new MyUsers({ name, 'hobby': hobbies });
	await user.save();
	const users = await MyUsers.find({});
	res.json(users);
});
app.listen(3000, async () => {
	await mongoose.connect(
		`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.we1k9ku.mongodb.net/?retryWrites=true&w=majority`
	);
	console.log('connected');
	console.log('server is up and running at http://127.0.0.1:3000');
});
