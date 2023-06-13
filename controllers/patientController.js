const patientManager = require("../managers/patientManager");

exports.getAll = async (req, res) => {
  const patients = await patientManager.getAll();
  res.status(200).send(patients);
};

exports.create = async (req, res) => {
  const patientData = req.body.patientData;
  const patient = await patientManager.create(patientData);
  res.status(200).send(patient);
};

exports.get = async (req, res) => {
  const { patientId } = req.params;
  const patient = await patientManager.get(patientId);
  res.status(200).send(patient);
};

exports.update = async (req, res) => {
  const { patientId } = req.params;
  const patientData = req.body;
  const patient = await patientManager.update(patientId, patientData);
  res.status(200).send(patient);
};

exports.delete = async (req, res) => {
  const { patientId } = req.params;
  const patient = await patientManager.delete(patientId);
  res.status(200).send(patient);
};
