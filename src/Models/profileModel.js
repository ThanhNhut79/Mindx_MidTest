import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  skills: [String],
  hobbies: String,
  goals: [String],
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
