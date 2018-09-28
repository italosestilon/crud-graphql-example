var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var artistSchema = new Schema({
  name: { type: String, required: true, max: 256 },
  albuns: [{ type: Schema.Types.ObjectId, ref: "Album" }]
});

module.exports = mongoose.model("Artist", artistSchema);
