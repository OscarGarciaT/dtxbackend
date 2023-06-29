const mongoose = require('mongoose');

const {Schema} = mongoose;

const patientSchema = new Schema(
  {
    nombres: {type: Schema.Types.String, required: true},
    apellidos: {type: Schema.Types.String, required: true},
    cedula: {type: Schema.Types.String, required: true},
    celular: {type: Schema.Types.String, required: true},
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
  },
  {
    timestamps: true,
  },
);

const appointmentSchema = new Schema(
  {
    estado: {type: Schema.Types.String, required: true},
    motivo: {type: Schema.Types.String, required: true},
    fecha_cita: {type: Schema.Types.String, required: true},
    paciente: {type: Schema.Types.ObjectId, required: true},
  },
  {
    timestamps: true,
  },
);

const doctorSchema = new Schema(
  {
    doctor_nombre: {type: Schema.Types.String},
    doctor_telefono: {type: Schema.Types.String},
    doctor_pacientes: {type: [patientSchema], default: []},
    doctor_citas: {type: [appointmentSchema], default: []},
    doctor_role: {
      type: Schema.Types.String,
      enum: ['DENTISTA', 'ORTODONCISTA'],
      default: 'ORTODONCISTA',
    },
    user_email: {type: Schema.Types.String},
    profile: {type: Schema.Types.ObjectId, required: true},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('doctor', doctorSchema);
