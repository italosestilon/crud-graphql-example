import createArtistLoader from "./artist";
import createAlbumLoader from "./album";
import createUserLoader from "./user";

export default () => {
  return {
    artistLoader: createArtistLoader(),
    albumLoader: createAlbumLoader(),
    userLoader: createUserLoader()
  };
};
