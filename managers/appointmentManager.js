const { default: mongoose } = require('mongoose');
const AppointmentModel = require('../models/appointmentModel');

exports.createDoctorAppointment = async (doctorId, appointmentData) => {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId)
    appointmentData.doctor_id = doctorObjectId
    const appointment = new AppointmentModel(appointmentData)
    appointment.save()
        .then(savedAppointment => {
            console.log("New appointment saved", savedAppointment)
            return appointment
        })
        .catch(error => {
            console.log("Error saving new appointment", error)
        })
  };
  
exports.getAllDoctorAppointments = async (doctorId) => {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId)
    const appointments = await AppointmentModel.find({doctor_id:doctorObjectId })
    return appointments
};