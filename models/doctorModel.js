
const mongoose = require('mongoose');
const PatientModel = require('./patientModel');
//const AppointmentModel = require('./appointmentModel')

const {Schema} = mongoose;

const doctorSchema = new Schema(
  {
    doctor_nombre: {type: Schema.Types.String},
    doctor_telefono: {type: Schema.Types.String},
    doctor_pacientes: {type: [PatientModel.Schema], default: []},
    //doctor_citas: {type: [AppointmentModel.Schema], default: []},
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
