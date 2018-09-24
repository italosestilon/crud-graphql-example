const Koa = require('koa');
const app = new Koa();

//getting data access configurations
const config = require('config');

var mongoose = require('mongoose');

//connecting to mongodb
mongoose.connect(
	config.dbHost, 
	{
		user : config.user,
		pass : config.password,
		useNewUrlParser : true
	});

//getting the connection
var db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'We had an error:'));
db.once('open', console.log.bind(console, "We're connected to mongodb :)"));

//listen on port 3000
app.listen(3000);