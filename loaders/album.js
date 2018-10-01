import Album from "../models/album";
import DataLoader from "dataloader";
import _ from "underscore";

const albumLoader = new DataLoader(async albumIds => {
  const albums = await Album.find({ _id: { $in: albumIds } });
  const albumsById = _.indexBy(albums, "_id");
  return albumIds.map(albumId => albumsById[albumId]);
});

export default albumLoader;
