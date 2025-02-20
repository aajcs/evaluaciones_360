const { Router } = require("express");
const { check } = require("express-validator");
const {
  createAnswers,
  getAnswers,
  getAnswer,
  updateAnswer,
} = require("../controllers/answer");
const { validarCampos } = require("../middlewares/validarCampos");
const { validadJwt } = require("../middlewares/validarJwt");
const router = Router();

router.post(
  "/",
  [
    // check("questionId", "Question ID is required").not().isEmpty(),
    // check("userId", "User ID is required").not().isEmpty(),
    // check("evaluationId", "Evaluation ID is required").not().isEmpty(),
    // check("selectedAnswer", "Selected answer is required").not().isEmpty(),
    // check("isCorrect", "Is correct is required").not().isEmpty(),
    validarCampos,
  ],
  createAnswers
);

router.get("/", validadJwt, getAnswers);

// router.get("/:id", validarJwt, getAnswer);

// router.put("/:id", validarJwt, updateAnswer);

module.exports = router;
