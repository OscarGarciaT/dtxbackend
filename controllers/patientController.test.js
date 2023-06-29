const patientManager = require('../managers/patientManager');
const patientController = require('./patientController');

jest.mock('../managers/patientManager'); // Mock del patientManager

describe('Patient Controller', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Restablecer los mocks después de cada prueba
  });

  test('Obtener todos los pacientes', async () => {
    const patients = [{name: 'John'}, {name: 'Jane'}];
    patientManager.getAll.mockResolvedValue(patients);
    const sendMock = jest.fn();
    const res = {status: jest.fn().mockReturnValue({send: sendMock})};

    await patientController.getAll({}, res);

    expect(patientManager.getAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(patients);
  });

  test('Crear un paciente', async () => {
    const patientData = {name: 'John'};
    const newPatient = {_id: '123', ...patientData};
    patientManager.create.mockResolvedValue(newPatient);
    const sendMock = jest.fn();
    const res = {status: jest.fn().mockReturnValue({send: sendMock})};
    const req = {body: {patientData}};

    await patientController.create(req, res);

    expect(patientManager.create).toHaveBeenCalledTimes(1);
    expect(patientManager.create).toHaveBeenCalledWith(patientData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(newPatient);
  });

  test('Obtener un paciente por ID', async () => {
    const patientId = '123';
    const patient = {_id: patientId, name: 'John'};
    patientManager.get.mockResolvedValue(patient);
    const sendMock = jest.fn();
    const res = {status: jest.fn().mockReturnValue({send: sendMock})};
    const req = {params: {patientId}};

    await patientController.get(req, res);

    expect(patientManager.get).toHaveBeenCalledTimes(1);
    expect(patientManager.get).toHaveBeenCalledWith(patientId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(patient);
  });

  test('Actualizar un paciente', async () => {
    const patientId = '123';
    const patientData = {name: 'John'};
    const updatedPatient = {_id: patientId, ...patientData};
    patientManager.update.mockResolvedValue(updatedPatient);
    const sendMock = jest.fn();
    const res = {status: jest.fn().mockReturnValue({send: sendMock})};
    const req = {params: {patientId}, body: patientData};

    await patientController.update(req, res);

    expect(patientManager.update).toHaveBeenCalledTimes(1);
    expect(patientManager.update).toHaveBeenCalledWith(patientId, patientData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(updatedPatient);
  });

  test('Eliminar un paciente', async () => {
    const patientId = '123';
    const deletedPatient = {_id: patientId, name: 'John'};
    patientManager.delete.mockResolvedValue(deletedPatient);
    const sendMock = jest.fn();
    const res = {status: jest.fn().mockReturnValue({send: sendMock})};
    const req = {params: {patientId}};

    await patientController.delete(req, res);

    expect(patientManager.delete).toHaveBeenCalledTimes(1);
    expect(patientManager.delete).toHaveBeenCalledWith(patientId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(deletedPatient);
  });
});
