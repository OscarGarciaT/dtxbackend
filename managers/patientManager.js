const patientModel = require("../models/patientModel");

exports.getAll = async () => {
  const patients = await patientModel.find();
  return patients;
};

exports.create = async (patientData) => {
  const newPatient = await patientModel.create(patientData);
  return newPatient;
};

exports.get = async (patientId) => {
  const patient = await patientModel.findById(patientId);
  return patient;
};

exports.update = async (patientId, patientData) => {
  const updatedPatient = await patientModel.findOneAndUpdate(
    { _id: patientId },
    { set: patientData }
  );
  return updatedPatient;
};

exports.delete = async (patientId) => {
  const deletedPatient = await patientModel.findOneAndRemove(patientId);
  return deletedPatient;
};
