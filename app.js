const Koa = require('koa');
const app = new Koa();

//connecting to mongodb
var mongoose = require('mongoose');
mongoose.connect(
	'mongodb://ds211083.mlab.com:11083/entria-chanllenge-songs', 
	{
		user : 'server-entria-challenge',
		pass : 'NoitesSombrias19',
		useNewUrlParser : true
	});

//getting the connection
var db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'We had an error:'));
db.once('open', console.log.bind(console, "We're connected to mongodb :)"));

//listen on port 3000
app.listen(3000);