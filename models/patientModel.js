const mongoose = require('mongoose');

const {Schema} = mongoose;

const patientSchema = new Schema(
    {
      nombres: {type: Schema.Types.String, required: true},
      apellidos: {type: Schema.Types.String, required: true},
      cedula: {type: Schema.Types.String, required: true},
      celular: {type: Schema.Types.String, required: true},
      doctor_id: {type: Schema.Types.ObjectId, required: 'Doctor', required: true, default: "649be3a8684dc54c7b7ba6db"},
      sexo: {
        type: Schema.Types.String,
        enum: ['masculino', 'femenino', 'otro'],
      },
      edad: {type: Schema.Types.Number, required: true},
      enfermedad_problema_actual: {type: Schema.Types.String},
      antecedentes_personales: {type: Schema.Types.String},
      motivo_consulta: {type: Schema.Types.String},
      antecedentes_familiares: {type: Schema.Types.Mixed},
      indices_cpo_cbo: {type: Schema.Types.Mixed},
      info_general: {type: Schema.Types.Mixed},
      planes_varios: {type: Schema.Types.Mixed},
      salud_bucal: {type: Schema.Types.Mixed},
      signos_vitales: {type: Schema.Types.Mixed},
      sistema_estomatognatico: {type: Schema.Types.Mixed},
      diagnosticos: {type: [Schema.Types.Mixed]},
      tratamientos: {type: [Schema.Types.Mixed]},
    },
    {
      timestamps: true,
    },
  );
  
module.exports = mongoose.model('patient', patientSchema);
  