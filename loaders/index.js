import createArtistLoader from "./artist";
import createAlbumLoader from "./album";

export default () => {
  return {
    artistLoader: createArtistLoader(),
    albumLoader: createAlbumLoader()
  };
};
