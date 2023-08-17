const patientManager = require('../managers/patientManager');
const patientController = require('./patientController');

jest.mock('../managers/patientManager'); // Mock del patientManager

describe('Patient Controller', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Restablecer los mocks después de cada prueba
  });

  test('Crear un paciente', async () => {
    const doctorId = '123';
    const patientData = {
      info_general: {
        nombres: 'John',
        apellidos: 'Doe',
        cedula: '1234567890',
        celular: '1234567890',
        sexo: 'M',
        edad: 30,
      },
      // ... otras propiedades
    };
    const newPatient = { _id: '123', ...patientData };
    patientManager.createPatient.mockResolvedValue(newPatient);
    const sendMock = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ send: sendMock }) };
    const req = { params: { doctorId }, body: { patientData } };

    await patientController.create(req, res);

    expect(patientManager.createPatient).toHaveBeenCalledTimes(1);
    expect(patientManager.createPatient).toHaveBeenCalledWith(
      doctorId,
      expect.objectContaining({
        info_general: expect.objectContaining({
          nombres: 'John',
          apellidos: 'Doe',
          cedula: '1234567890',
          celular: '1234567890',
          sexo: 'M',
          edad: 30,
        }),
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(newPatient);
  });

  test('Obtener un paciente por ID', async () => {
    const patientId = '123';
    const patient = { _id: patientId, nombres: 'John' };
    patientManager.getPatientById.mockResolvedValue(patient);
    const sendMock = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ send: sendMock }) };
    const req = { params: { patientId } };

    await patientController.get(req, res);

    expect(patientManager.getPatientById).toHaveBeenCalledTimes(1);
    expect(patientManager.getPatientById).toHaveBeenCalledWith(patientId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(patient);
  });

  test('Actualizar un paciente', async () => {
    const patientId = '123';
    const patientData = {
      info_general: {
        nombres: 'John',
        apellidos: 'Doe',
        cedula: '1234567890',
        celular: '1234567890',
        sexo: 'M',
        edad: 30,
      },
      // ... otras propiedades
    };
    const updatedPatient = { _id: patientId, ...patientData };
    patientManager.updatePatient.mockResolvedValue(updatedPatient);
    const sendMock = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ send: sendMock }) };
    const req = { params: { patientId }, body: { patientData } };
  
    await patientController.update(req, res);
  
    expect(patientManager.updatePatient).toHaveBeenCalledTimes(1);
    expect(patientManager.updatePatient).toHaveBeenCalledWith(
      patientId,
      expect.objectContaining({
        info_general: expect.objectContaining({
          nombres: 'John',
          apellidos: 'Doe',
          cedula: '1234567890',
          celular: '1234567890',
          sexo: 'M',
          edad: 30,
        }),
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(updatedPatient);
  });

  test('Eliminar un paciente', async () => {
    const patientId = '123';
    const deletedPatient = { _id: patientId, nombres: 'John' };
    patientManager.deletePatient.mockResolvedValue(deletedPatient);
    const sendMock = jest.fn();
    const res = { status: jest.fn().mockReturnValue({ send: sendMock }) };
    const req = { params: { patientId } };

    await patientController.delete(req, res);

    expect(patientManager.deletePatient).toHaveBeenCalledTimes(1);
    expect(patientManager.deletePatient).toHaveBeenCalledWith(patientId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(deletedPatient);
  });
});