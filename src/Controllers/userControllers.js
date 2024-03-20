import UserService from "../Services/userService.js";
import jwt from "jsonwebtoken";

const UserController = {
  register: async (req, res) => {
    try {
      const newUser = await UserService.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);

      const payload = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(payload, "secret_key", { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
};

export default UserController;
