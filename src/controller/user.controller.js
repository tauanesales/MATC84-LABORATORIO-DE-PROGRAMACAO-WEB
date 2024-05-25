import userService from "../services/user.service.js";
import jwt from'jsonwebtoken';

const findById = async (req, res) => {
  try {
    const id = req.id;
    const user = await userService.findByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password, city, state",
      });
    }

    if (!userService.validatePassword(password)) {
      return res
        .status(400)
        .json({
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, and one special character",
        });
    }
    const id = req.params.id;
    await userService.updateService(id, name, email, password, city, state);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateLoggedUser = async (req, res) => {
  try {
    const { name, email, password, city, state } = req.body;
    if (!name && !email && !password && !city && !state) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password, city, state",
      });
    }
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id
    await userService.updateService(userId, name, email, password);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const userId = decoded.id

    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { findById, update, deleteUser, updateLoggedUser };
