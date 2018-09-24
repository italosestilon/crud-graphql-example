var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var songSchema = new Schema({
	title		: {type: String, required: true, max:256},
	release_date: {type: Date, required:true},
	album		: {type: Schema.Types.ObjectId, ref: 'Album', required: true},
	artists		: [{type: Schema.Types.ObjectId, ref: 'Artist'}]
});

module.exports = mongoose.model('Song', songSchema);