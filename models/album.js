var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var albumSchema = new Schema({
	title		: {type: String, required: true, max:256},
	release_date: {type: Date, required:true},
	songs		: [{type: Schema.Types.ObjectId, ref: 'Song'}],
	artists		: [{type: Schema.Types.ObjectId, ref: 'Artist'}]
});

module.exports = mongoose.model('Album', albumSchema);