const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  login,
  validateUser,
  getUsers,
  updateUser,
  getUserEmployees,
} = require("../controllers/user");
const { validarCampos } = require("../middlewares/validarCampos");
const { validadJwt } = require("../middlewares/validarJwt");
const router = Router();

router.post(
  "/register",
  [
    check("userName", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validarCampos,
  ],
  login
);

router.get("/employees", validadJwt, getUserEmployees);

router.get("/", validadJwt, getUsers);

router.put("/:id", validadJwt, updateUser);

router.get("/validate", validadJwt, validateUser);

module.exports = router;
