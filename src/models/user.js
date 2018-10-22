import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true, hidden: true },
  active: { type: Boolean, default: true }
});

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.encryptPassword(this.password);
  }

  next();
});

userSchema.methods.encryptPassword = function(plaintextPassword) {
  const saltRounds = 10;
  return bcrypt.hashSync(plaintextPassword, saltRounds);
};

userSchema.methods.authenticate = function(plaintextPassword) {
  return bcrypt.compareSync(plaintextPassword, this.password);
};

export default mongoose.model("User", userSchema);
