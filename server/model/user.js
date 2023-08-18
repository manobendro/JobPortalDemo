import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  passwd: String,
});
const User = mongoose.model("Users", userSchema);
export default User;
