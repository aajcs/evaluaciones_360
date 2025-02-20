const { Router } = require("express");
const { check } = require("express-validator");
const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
} = require("../controllers/employee");
const { validarCampos } = require("../middlewares/validarCampos");
const { validadJwt } = require("../middlewares/validarJwt");
const router = Router();

router.post(
  "/create",
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("position", "Position is required").not().isEmpty(),
    check("department", "Department is required").not().isEmpty(),
    check("hireDate", "Hire date is required").not().isEmpty(),
    validarCampos,
  ],
  createEmployee
);

router.get("/", validadJwt, getEmployees);

router.get("/:id", validadJwt, getEmployee);

router.put(
  "/:id",
  [
    check("userId", "User ID is required").not().isEmpty(),
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("position", "Position is required").not().isEmpty(),
    check("department", "Department is required").not().isEmpty(),
    check("hireDate", "Hire date is required").not().isEmpty(),
    validarCampos,
  ],
  updateEmployee
);

module.exports = router;
