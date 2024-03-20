import Profile from "../Models/profileModel.js";
const ProfileService = {
  createProfile: async (profileData) => {
    try {
      return await Profile.create(profileData);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getProfileById: async (profileId) => {
    try {
      return await Profile.findById(profileId).populate("userId");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProfile: async (profileId, newData) => {
    try {
      return await Profile.findByIdAndUpdate(profileId, newData, { new: true });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteProfile: async (profileId) => {
    try {
      return await Profile.findByIdAndDelete(profileId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default ProfileService;
