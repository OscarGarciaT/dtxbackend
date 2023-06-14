const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    nombres: { type: Schema.Types.String, required: true },
    apellidos: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    telefono: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", profileSchema);
