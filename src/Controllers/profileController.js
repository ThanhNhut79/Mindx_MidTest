import ProfileService from "../Services/profileService.js";

const ProfileController = {
  createProfile: async (req, res) => {
    try {
      const newProfile = await ProfileService.createProfile(req.body);
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getProfileById: async (req, res) => {
    try {
      const profile = await ProfileService.getProfileById(req.params.id);
      res.json(profile);
    } catch (error) {
      res.status(404).json({ message: "Profile not found" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const profileId = req.params.id;
      const updatedProfileData = req.body;

      // Lấy thông tin người dùng từ req.user được gán từ middleware
      const loggedInUserId = req.user.id;

      // Kiểm tra xem người dùng có quyền sửa hồ sơ hay không
      const profile = await ProfileService.getProfileById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      if (profile.userId.toString() !== loggedInUserId) {
        return res.status(403).json({
          message: "You do not have permission to update this profile",
        });
      }

      // Nếu người dùng có quyền, tiến hành cập nhật hồ sơ
      const updatedProfile = await ProfileService.updateProfile(
        profileId,
        updatedProfileData
      );
      res.json(updatedProfile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const profileId = req.params.id;

      // Lấy thông tin người dùng từ req.user được gán từ middleware
      const loggedInUserId = req.user.id;

      // Kiểm tra xem người dùng có quyền xóa hồ sơ hay không
      const profile = await ProfileService.getProfileById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      if (profile.userId.toString() !== loggedInUserId) {
        return res.status(403).json({
          message: "You do not have permission to delete this profile",
        });
      }

      // Nếu người dùng có quyền, tiến hành xóa hồ sơ
      await ProfileService.deleteProfile(profileId);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default ProfileController;
