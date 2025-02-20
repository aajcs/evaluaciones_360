const { Schema, model } = require("mongoose");

const EvaluationSchema = new Schema(
  {
    employees: [
      {
        employeeId: {
          type: Schema.Types.ObjectId,
          ref: "Employee",
          required: true,
        },
        result: {
          type: String,
          default: null, // Inicialmente sin resultado
        },
        completed: {
          type: Boolean,
          default: false, // Para saber si el empleado ya respondió
        },
      },
    ],
    evaluatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },

    comments: { type: String },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
    questions: [
      { type: Schema.Types.ObjectId, ref: "Question", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

EvaluationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Evaluation", EvaluationSchema);
