const patientModel = require('../models/patientModel');
const patientManager = require('./patientManager');

jest.mock('../models/patientModel'); // Mock del modelo de paciente

describe('Patient Manager', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Restablecer los mocks después de cada prueba
  });

  test('Obtener todos los pacientes', async () => {
    const patients = [{name: 'John'}, {name: 'Jane'}];
    patientModel.find.mockResolvedValue(patients);

    const result = await patientManager.getAll();

    expect(result).toEqual(patients);
    expect(patientModel.find).toHaveBeenCalledTimes(1);
  });

  test('Crear un paciente', async () => {
    const patientData = {name: 'John'};
    const newPatient = {_id: '123', ...patientData};
    patientModel.create.mockResolvedValue(newPatient);

    const result = await patientManager.create(patientData);

    expect(result).toEqual(newPatient);
    expect(patientModel.create).toHaveBeenCalledTimes(1);
    expect(patientModel.create).toHaveBeenCalledWith(patientData);
  });

  test('Obtener un paciente por ID', async () => {
    const patientId = '123';
    const patient = {_id: patientId, name: 'John'};
    patientModel.findById.mockResolvedValue(patient);

    const result = await patientManager.get(patientId);

    expect(result).toEqual(patient);
    expect(patientModel.findById).toHaveBeenCalledTimes(1);
    expect(patientModel.findById).toHaveBeenCalledWith(patientId);
  });

  test('Actualizar un paciente', async () => {
    const patientId = '123';
    const patientData = {name: 'John'};
    const updatedPatient = {_id: patientId, ...patientData};
    patientModel.findOneAndUpdate.mockResolvedValue(updatedPatient);

    const result = await patientManager.update(patientId, patientData);

    expect(result).toEqual(updatedPatient);
    expect(patientModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    expect(patientModel.findOneAndUpdate).toHaveBeenCalledWith(
      {_id: patientId},
      {set: patientData},
    );
  });

  test('Eliminar un paciente', async () => {
    const patientId = '123';
    const deletedPatient = {_id: patientId, name: 'John'};
    patientModel.findOneAndRemove.mockResolvedValue(deletedPatient);

    const result = await patientManager.delete(patientId);

    expect(result).toEqual(deletedPatient);
    expect(patientModel.findOneAndRemove).toHaveBeenCalledTimes(1);
    expect(patientModel.findOneAndRemove).toHaveBeenCalledWith(patientId);
  });
});
