const appointmentController = require('../controllers/appointmentController');
const appointmentManager = require('../managers/appointmentManager');

jest.mock('../managers/appointmentManager');

describe('Appointment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Create appointment', async () => {
    const req = {
      params: { doctorId: 'doctor123' },
      body: {
        appointmentData: {
          paciente_id: 'patient123',
          fecha_cita: '2023-08-15',
          hora_inicio_cita: '10:00',
          hora_fin_cita: '11:00',
          motivo: 'Checkup',
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const expectedSavedAppointment = { _id: '123', ...req.body.appointmentData };
    appointmentManager.createDoctorAppointment.mockResolvedValue(expectedSavedAppointment);

    await appointmentController.createAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expectedSavedAppointment);
  });

  test('Get all appointments', async () => {
    const req = {
      params: { doctorId: 'doctor123' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const expectedAppointments = [
      { _id: 'appointment1', motivo: 'Checkup' },
      { _id: 'appointment2', motivo: 'Follow-up' },
    ];
    appointmentManager.getAllDoctorAppointments.mockResolvedValue(expectedAppointments);

    await appointmentController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expectedAppointments);
  });
});