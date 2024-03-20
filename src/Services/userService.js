import User from "../Models/userModel.js";
import bcrypt from "bcrypt";

const UserService = {
  register: async (userData) => {
    try {
      // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
      return await User.create(userData);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getUserById: async (id) => {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};

export default UserService;
