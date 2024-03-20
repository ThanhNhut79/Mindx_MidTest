import jwt from "jsonwebtoken";
import UserService from "../Services/userService.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Xác thực và giải mã token
    jwt.verify(token, "secret_key", async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Lấy thông tin người dùng từ CSDL
      const userId = decodedToken.user.id;
      const user = await UserService.getUserById(userId);

      // Kiểm tra xem người dùng có tồn tại không
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
