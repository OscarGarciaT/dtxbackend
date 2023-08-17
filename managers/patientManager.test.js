const mongoose = require('mongoose');
const patientModel = require('../models/patientModel');
const patientManager = require('./patientManager');

jest.mock('../models/patientModel'); // Mock del modelo de paciente

describe('Patient Manager', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Restablecer los mocks después de cada prueba
  });

  test('Get all patients by doctor', async () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString(); // ID válido generado
    const patients = [{ name: 'John' }, { name: 'Jane' }];
    patientModel.find.mockResolvedValue(patients);

    const result = await patientManager.getAllPatientsByDoctor(doctorId, '');

    expect(result).toEqual(patients);
    expect(patientModel.find).toHaveBeenCalledTimes(1);
  });

  test('Create a patient', async () => {
    const doctorId = new mongoose.Types.ObjectId().toHexString();
    const patientData = { name: 'John' };
    const newPatient = { doctorId: doctorId, patientData }; // Corrección aquí
    patientModel.prototype.save.mockResolvedValue(newPatient);
  
    const result = await patientManager.createPatient(doctorId, patientData);
  
    expect(result).toEqual(newPatient);
    expect(patientModel.prototype.save).toHaveBeenCalledTimes(1);
  });

  test('Get patient by ID', async () => {
    const patientId = new mongoose.Types.ObjectId().toHexString(); // Objeto ObjectId válido
    const patient = { _id: patientId, name: 'John' };
    patientModel.findById.mockResolvedValue(patient);

    const result = await patientManager.getPatientById(patientId);

    expect(result).toEqual(patient);
  });

  // Otras pruebas aquí...
});