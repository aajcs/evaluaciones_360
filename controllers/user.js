const { generarJWT } = require("../helpers/jwt");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, email, password } = req.body;
    const user = new User({ userName, email, password });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    // Generar el JWT
    const token = await generarJWT(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, { nombre, email, password });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const validateUser = async (req, res) => {
  const token = await generarJWT(req.id);

  const user = await User.findById(req.id);

  res.json({ user, token });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid User / Password" });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid User / Password" });
    }
    const token = await generarJWT(user.id);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  validateUser,
  login,
};
