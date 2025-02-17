const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = object._id;
  return object;
};

module.exports = model("User", userSchema);
