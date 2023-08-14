const { default: mongoose } = require('mongoose');
const PatientModel = require('../models/patientModel')

exports.getAllPatientsByDoctor = async (targetDoctorId, searchQuery) => {
  const doctorObjectId = new mongoose.Types.ObjectId(targetDoctorId)
  const patients = await PatientModel.find({doctor_id: doctorObjectId})

  if (!searchQuery) {
    return patients;
  }

  const queryRegex = new RegExp(searchQuery, 'i'); // Case-insensitive regex pattern

  const filteredPatients = patients.filter((patient) => {
    const {nombres, apellidos, celular} = patient;

    // Check if any of the fields match the searchQuery
    const matchNombres = nombres.match(queryRegex);
    const matchApellidos = apellidos.match(queryRegex);
    const matchCelular = celular.match(queryRegex);

    // Match if the query is a combination of nombres followed by apellidos
    const matchCombination = `${nombres} ${apellidos}`.match(queryRegex);

    return matchNombres || matchApellidos || matchCelular || matchCombination;
  });

  return filteredPatients;
};

exports.createPatient = async (doctorId, patientData) => {
  const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
  patientData.doctor_id =  doctorObjectId;
  const patient = new PatientModel(patientData);
  patient.save()
    .then(savedPatient => {
      console.log("Patient saved succesfuly", savedPatient)
    })
    .catch(error => {
      console.log("Error saving new patient", error)
    })
  return patient;
};

exports.getPatientById = async (patientId) => {
  const patientObjectId = new mongoose.Types.ObjectId(patientId);
  const patient = PatientModel.findById(patientObjectId);
  return patient;
};

exports.updatePatient = async (patientId, patientData) => {
  PatientModel.updateOne({_id: patientId}, patientData)
    .then(updatedPatient => {
      console.log('Patient updated succesfully', updatedPatient);
    })
    .catch(error => {
      console.log('Error updating patient')
    })
  return PatientModel.findById(patientId)
};

exports.deletePatient = async (patientId) => {
  const patient = PatientModel.findById(patientId);
  PatientModel.deleteOne({_id: patientId})
    .then(result => {
      console.log('Patient deleted successfully', result);
    })
    .catch(error => {
      console.error('Error deleting patient', error);
    })
    return patient;
};

const DiagnosesModel = require('../models/diagnosisModel').UnifiedDiagnosis

exports.getAllDiagnoses = async() => {
  const diagnoses  = DiagnosesModel.find({})
  return diagnoses;
}