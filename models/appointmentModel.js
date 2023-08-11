const mongoose = require('mongoose');
const DoctorModel  = require('./doctorModel');
const PatientModel = require('./patientModel')

const {Schema} = mongoose;

const appointmentSchema = new Schema(
    {
      motivo: {type: Schema.Types.String, required: true},
      fecha_cita: {type: Schema.Types.String, required: true},
      hora_inicio_cita: {type: Schema.Types.String, required: true},
      hora_fin_cita:{type: Schema.Types.String, required: true},
      paciente_id: {type: Schema.Types.ObjectId, ref: 'Patient', required: true},
      doctor_id: {type: Schema.Types.ObjectId, ref: 'Doctor', required: true }
    },
    {
      timestamps: true,
    },
  );

  module.exports = mongoose.model('appointment', appointmentSchema);