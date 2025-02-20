const { Schema, model } = require("mongoose");

const Employee = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    hireDate: { type: Date, required: true },
    evaluations: [{ type: Schema.Types.ObjectId, ref: "Evaluation" }],
  },
  {
    timestamps: true,
  }
);

Employee.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Employee", Employee);
