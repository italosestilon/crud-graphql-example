import mongoose from "mongoose";

const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true, max: 256 },
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }]
});

export default mongoose.model("Artist", artistSchema);
