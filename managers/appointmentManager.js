const { default: mongoose } = require('mongoose');
const AppointmentModel = require('../models/appointmentModel');

exports.createDoctorAppointment = async (doctorId, appointmentData) => {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId)
    appointmentData.doctor_id = doctorObjectId
    const appointment = new AppointmentModel(appointmentData);
    try {
        const savedAppointment = await appointment.save();
        console.log("New appointment saved", savedAppointment);
        return savedAppointment; 
    } catch (error) {
        console.log("Error saving new appointment", error);
        throw error; 
    }
};
  
exports.getAllDoctorAppointments = async (doctorId) => {
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId)
    const appointments = await AppointmentModel.find({doctor_id:doctorObjectId })
    return appointments
};

exports.getAppointmentById = async (appointmentId) => {
    const appointmentObjectId = new mongoose.Types.ObjectId(appointmentId);
    const appointment = AppointmentModel.findById(appointmentObjectId);
    return appointment;
};

exports.updateAppointment = async (appointmentId, appointmentData) => {
    AppointmentModel.updateOne({_id: appointmentId}, appointmentData)
      .then(updatedAppointment => {
        console.log('Appointment updated succesfully', updatedAppointment);
      })
      .catch(error => {
        console.log('Error updating appointment')
      })
    return AppointmentModel.findById(appointmentId)
};
  
exports.deleteAppointment = async (appointmentId) => {
    const appointment = AppointmentModel.findById(appointmentId);
    AppointmentModel.deleteOne({_id: appointmentId})
      .then(result => {
        console.log('Appointment deleted successfully', result);
      })
      .catch(error => {
        console.error('Error deleting appointment', error);
      })
      return appointment;
};