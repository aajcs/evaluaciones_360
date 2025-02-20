const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    texto: { type: String, required: true },

    opciones: { type: [String] },
  },
  {
    timestamps: true,
  }
);

QuestionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Question", QuestionSchema);
