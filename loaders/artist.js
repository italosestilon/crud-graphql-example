import Artist from "../models/artist";
import DataLoader from "dataloader";
import _ from "underscore";

export default () => {
  return new DataLoader(async artistIds => {
    try {
      const artists = await Artist.find({ _id: { $in: artistIds } });
      const artistsById = _.indexBy(artists, "_id");
      return artistIds.map(artistId => artistsById[artistId]);
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
};
