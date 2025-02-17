const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, login, validateUser } = require("../controllers/user");
const { validarCampos } = require("../middlewares/validarCampos");
const { validadJwt } = require("../middlewares/validarJwt");
const router = Router();

router.post(
  "/",
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

router.get("/validate", validadJwt, validateUser);

module.exports = router;
