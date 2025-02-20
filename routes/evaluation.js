const { Router } = require("express");
const { check } = require("express-validator");
const {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
} = require("../controllers/evaluation");
const { validarCampos } = require("../middlewares/validarCampos");
const { validadJwt } = require("../middlewares/validarJwt");
const router = Router();

router.post(
  "/",
  [
    check("employees", "Employee ID is required").not().isEmpty(),
    check("evaluatorId", "Evaluator ID is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("comments", "Comments is required").not().isEmpty(),
    // check("feedbacks", "Feedbacks is required").not().isEmpty(),
    check("questions", "Questions is required").not().isEmpty(),
    validarCampos,
  ],
  createEvaluation
);

router.get("/", validadJwt, getEvaluations);

router.get("/:id", validadJwt, getEvaluation);

router.put("/:id", validadJwt, updateEvaluation);

module.exports = router;
