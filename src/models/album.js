import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: { type: String, required: true, max: 256 },
  release_date: { type: Date, required: true },
  songs: [{ type: String }],
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }]
});

export default mongoose.model("Album", albumSchema);
