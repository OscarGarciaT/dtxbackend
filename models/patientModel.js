const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    nombres: { type: Schema.Types.String, required: true },
    apellidos: { type: Schema.Types.String, required: true },
    cedula: { type: Schema.Types.String, required: true },
    celular: { type: Schema.Types.String, required: true },
    celular: { type: Schema.Types.String, required: true },
    sexo: {
      type: Schema.Types.String,
      enum: ["masculino", "femenino", "otro"],
    },
    edad: { type: Schema.Types.Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patient", patientSchema);
