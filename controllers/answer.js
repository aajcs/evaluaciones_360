const Answer = require("../models/answer");
const Question = require("../models/question");
const Evaluation = require("../models/evaluation"); // Asegúrate de importar el modelo de Evaluation

const createAnswers = async (req, res) => {
  try {
    const answers = req.body.answers; // Array de respuestas

    // Validar que el array de respuestas no esté vacío
    if (!Array.isArray(answers)) {
      return res
        .status(400)
        .json({ message: "Se esperaba un array de respuestas" });
    }

    const createdAnswers = [];
    const skippedAnswers = [];
    let totalScore = 0;
    let evaluationId = null;
    let employeeId = null;

    // Define los valores de puntaje para cada índice de opción
    const scoreValues = [5, 4, 3, 2, 1]; // Puedes ajustar estos valores según sea necesario

    for (const answerData of answers) {
      const {
        questionId,
        userID,
        evaluationId: evalId,
        selectedAnswer,
        employeeId: empId,
      } = answerData;

      // Validar que evaluationId y employeeId estén definidos
      if (!evalId || !empId) {
        skippedAnswers.push({
          questionId,
          message: `Falta evaluationId o employeeId en la respuesta`,
        });
        continue;
      }

      evaluationId = evalId; // Asignar evaluationId
      employeeId = empId; // Asignar employeeId

      // Buscar la pregunta correspondiente en la base de datos
      const question = await Question.findById(questionId);
      if (!question) {
        skippedAnswers.push({
          questionId,
          message: `Pregunta con ID ${questionId} no encontrada`,
        });
        continue;
      }

      // Verificar si ya existe una respuesta para el usuario, evaluación y pregunta
      let existingAnswer = await Answer.findOne({
        questionId,
        userID,
        evaluationId,
      });
      if (existingAnswer) {
        // Actualizar el selectedAnswer de la respuesta existente
        existingAnswer.selectedAnswer = selectedAnswer;
        existingAnswer.isCorrect =
          selectedAnswer === question.respuestaCorrecta;
        await existingAnswer.save();
        createdAnswers.push(existingAnswer);
      } else {
        // Crear una nueva respuesta
        const isCorrect = selectedAnswer === question.respuestaCorrecta;
        const newAnswer = await Answer.create({
          questionId,
          userID,
          evaluationId,
          selectedAnswer,
          isCorrect,
        });
        createdAnswers.push(newAnswer);
      }

      // Obtener el índice de la opción seleccionada
      const selectedIndex = question.opciones.indexOf(selectedAnswer);

      // Calcular el puntaje basado en el índice de la opción seleccionada
      const score = scoreValues[selectedIndex] || 0;
      totalScore += score;
    }

    // Calcular el promedio de puntaje
    const totalQuestions = answers.length;
    const averageScore = totalScore / totalQuestions;

    // Determinar el resultado basado en el promedio de puntaje
    let result;
    if (averageScore >= 4.5) {
      result = "Excelente";
    } else if (averageScore >= 3.5) {
      result = "Bueno";
    } else if (averageScore >= 2.5) {
      result = "Regular";
    } else {
      result = "Deficiente";
    }

    // Actualizar el score y el resultado en la evaluación
    if (createdAnswers.length > 0 && evaluationId && employeeId) {
      console.log("evaluationId:", evaluationId);
      console.log("employeeId:", employeeId);
      console.log("result:", result);

      const validando = await Evaluation.findOneAndUpdate(
        {
          _id: evaluationId, // ID de la evaluación
          "employees.employeeId": employeeId, // Busca el empleado por su ID
        },
        {
          $set: {
            "employees.$.result": result, // Actualiza el resultado
            "employees.$.completed": true, // Marca como completado
          },
        },
        { new: true } // Devuelve el documento actualizado
      );

      if (!validando) {
        console.log("No se encontró el empleado en la evaluación.");
      } else {
        console.log("Evaluación actualizada:", validando);
      }
    } else {
      console.log("No se pudo actualizar la evaluación: faltan datos.");
    }

    res.json({ createdAnswers, skippedAnswers, averageScore, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find()
      .populate("questionId")
      .populate("userID")
      .populate("evaluationId");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAnswers, getAnswers };
