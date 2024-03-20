import ProfileService from "../Services/profileService.js";

const checkProfileOwnership = async (req, res, next) => {
  try {
    // Lấy userId từ thông tin đăng nhập của người dùng
    const loggedInUserId = req.user._id;

    // Lấy profileId từ request params
    const profileId = req.params.id;

    // Lấy thông tin hồ sơ từ CSDL
    const profile = await ProfileService.getProfileById(profileId);

    // Kiểm tra xem hồ sơ có tồn tại không
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Kiểm tra xem userId của hồ sơ có trùng với userId của người dùng đang đăng nhập không
    if (profile.userId.toString() !== loggedInUserId) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to modify this profile",
      });
    }

    // Nếu người dùng có quyền sửa hoặc xóa, tiếp tục thực hiện các middleware tiếp theo
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkProfileOwnership;
