const patientModel = require('../models/patientModel');
const patientManager = require('./patientManager');
const { default: mongoose } = require('mongoose');

jest.mock('../models/patientModel'); // Mock del modelo de paciente

describe('Patient Manager', () => {
  afterEach(() => {
    jest.resetAllMocks(); // Restablecer los mocks después de cada prueba
  });

  describe('Patient Manager', () => {
    test('Get all patients by doctorId', async () => {
      const mockResponse = [
        {_id: "649c76f38ebbebb800d63f6d", name: 'Eduardo', doctor_id: "649be3a8684dc54c7b7ba6db"}
      ];
      const doctor_id = '649be3a8684dc54c7b7ba6db';
      const doctorObjectId = new mongoose.Types.ObjectId(doctor_id)
  
      // Espía la función patientModel.find() para que devuelva mockAll
      const findSpy = jest.spyOn(patientModel, 'find').mockResolvedValue(mockResponse);
  
      const result = await patientManager.getAllPatientsByDoctor(doctor_id);
      expect(result).toEqual(mockResponse);
  
      // Verifica si la función patientModel.find() fue llamada con los parámetros correctos
      expect(findSpy).toHaveBeenCalledWith({ doctor_id: doctorObjectId });
  
      // Restaura la función original después de la prueba
      findSpy.mockRestore();
    });
  });
});
