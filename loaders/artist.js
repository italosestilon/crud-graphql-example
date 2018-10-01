import Artist from "../models/artist";
import DataLoader from "dataloader";
import _ from "underscore";

const artistLoader = new DataLoader(async artistIds => {
  const artists = await Artist.find({ _id: { $in: artistIds } });
  const artistsById = _.indexBy("_id");
  return artistIds.map(artistId => artistsById[artistId]);
});

export default artistLoader;
