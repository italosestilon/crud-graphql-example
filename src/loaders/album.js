import Album from "../models/album";
import DataLoader from "dataloader";
import _ from "underscore";

export default () => {
  return new DataLoader(async albumIds => {
    try {
      const albums = await Album.find({ _id: { $in: albumIds } });
      const albumsById = _.indexBy(albums, "_id");
      return albumIds.map(albumId => albumsById[albumId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
};
