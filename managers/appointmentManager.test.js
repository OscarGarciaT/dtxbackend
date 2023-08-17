const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const AppointmentModel = require('../models/appointmentModel');
const appointmentManager = require('./appointmentManager');

jest.mock('../models/appointmentModel');

describe('Appointment Manager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Create a doctor appointment', async () => {
    const doctorId = new mongoose.Types.ObjectId().toString(); // Usar new para crear un nuevo ObjectId
    const appointmentData = { motivo: 'Checkup', fecha_cita: '2023-08-15', hora_inicio_cita: '10:00', hora_fin_cita: '11:00', paciente_id: '123' };
    const newAppointment = { ...appointmentData, _id: '123' };
    AppointmentModel.prototype.save.mockResolvedValue(newAppointment);
  
    const result = await appointmentManager.createDoctorAppointment(doctorId, appointmentData);
    console.log("Result:", result);
    console.log("Expected:", newAppointment);
    expect(result).toEqual(newAppointment);
    expect(AppointmentModel.prototype.save).toHaveBeenCalledTimes(1);
    expect(AppointmentModel.prototype.save).toHaveBeenCalledWith();
  });

  test('Get all doctor appointments', async () => {
    const doctorId = new ObjectId().toString();
    const appointments = [
      { motivo: 'Checkup', doctor_id: new ObjectId(doctorId) },
      { motivo: 'Follow-up', doctor_id: new ObjectId(doctorId) },
    ];
    AppointmentModel.find.mockResolvedValue(appointments);

    const result = await appointmentManager.getAllDoctorAppointments(doctorId);

    expect(result).toEqual(appointments);
    expect(AppointmentModel.find).toHaveBeenCalledTimes(1);
    expect(AppointmentModel.find).toHaveBeenCalledWith({ doctor_id: new ObjectId(doctorId) });
  });

  // Otros tests aquí...
});



