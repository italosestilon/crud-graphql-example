import User from "../models/user";
import DataLoader from "dataloader";
import _ from "underscore";

export default () => {
  return new DataLoader(async userIds => {
    try {
      const users = await User.find({ _id: { $in: userIds } });
      const usersById = _.indexBy(users, "_id");
      return userIds.map(userId => usersById[userId]);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
};
