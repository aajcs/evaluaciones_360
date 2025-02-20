const Question = require("../models/question");
const Evaluation = require("../models/evaluation");

const createEvaluation = async (req, res) => {
  try {
    const { employees, evaluatorId, date, comments, feedbacks, questions } =
      req.body;
    console.log(employees);
    // Crear la evaluación con los empleados asignados (sin resultado inicial)
    const evaluation = await Evaluation.create({
      employees: employees.map((e) => ({
        employeeId: e.employeeId,
        result: null,
        completed: false,
      })),
      evaluatorId,
      date,
      comments,
      feedbacks,
    });

    // Crear las preguntas y asociarlas con la evaluación
    const questionDocs = await Promise.all(
      questions.map(async (question) => {
        const opcionesArray = Array.isArray(question.opciones)
          ? question.opciones.flatMap((o) => o.split(",").map((x) => x.trim()))
          : question.opciones.split(",").map((o) => o.trim());

        const newQuestion = new Question({
          texto: question.texto,
          tipo: question.tipo,
          opciones: opcionesArray,
          respuestaCorrecta: question.respuestaCorrecta,
        });

        await newQuestion.save();
        return newQuestion._id;
      })
    );

    // Asociar preguntas creadas a la evaluación
    evaluation.questions = questionDocs;
    await evaluation.save();

    await evaluation.populate("questions");
    await evaluation.populate("employees.employeeId");
    await evaluation.populate("evaluatorId");

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las evaluaciones
const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("questions")
      .populate("employees.employeeId")
      .populate("evaluatorId");
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una evaluación por ID
const getEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate("questions")
      .populate("employees.employeeId")
      .populate("evaluatorId");
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar evaluación
const updateEvaluation = async (req, res) => {
  try {
    const { employees, evaluatorId, date, comments, feedbacks, questions } =
      req.body;
    console.log(evaluatorId.id);
    // Actualizar evaluación

    const evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      {
        employees: employees.map((employee) => ({
          employeeId: employee.id || employee, // Si viene con estructura, extraer ID
          result: employee.result || null,
          completed: employee.completed || false,
        })),
        evaluatorId: evaluatorId.id || evaluatorId,
        date,
        comments,
        feedbacks,
      },
      { new: true }
    )
      .populate("employees.employeeId")
      .populate("evaluatorId");

    // Eliminar preguntas antiguas asociadas
    await Question.deleteMany({ _id: { $in: evaluation.questions } });

    // Crear nuevas preguntas
    const questionDocs = await Promise.all(
      questions.map(async (question) => {
        const opcionesArray = Array.isArray(question.opciones)
          ? question.opciones.flatMap((o) => o.split(",").map((x) => x.trim()))
          : question.opciones.split(",").map((o) => o.trim());

        const newQuestion = new Question({
          texto: question.texto,
          tipo: question.tipo,
          opciones: opcionesArray,
          respuestaCorrecta: question.respuestaCorrecta,
        });

        await newQuestion.save();
        return newQuestion._id;
      })
    );

    // Actualizar preguntas en la evaluación
    evaluation.questions = questionDocs;
    await evaluation.save();

    await evaluation.populate("questions");
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el resultado de un empleado en la evaluación
const updateEmployeeResult = async (req, res) => {
  try {
    const { evaluationId, employeeId, result } = req.body;

    const evaluation = await Evaluation.findOneAndUpdate(
      { _id: evaluationId, "employees.employeeId": employeeId },
      {
        $set: {
          "employees.$.result": result,
          "employees.$.completed": true,
        },
      },
      { new: true }
    ).populate("employees.employeeId");

    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar evaluación
const deleteEvaluation = async (req, res) => {
  try {
    await Evaluation.findByIdAndDelete(req.params.id);
    res.json({ message: "Evaluation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluation,
  updateEvaluation,
  updateEmployeeResult,
  deleteEvaluation,
};
