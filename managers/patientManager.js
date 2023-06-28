const doctorModel = require("../models/doctorModel");

exports.getAllDoctorPatients = async (doctorId, searchQuery) => {
  const doctor = await doctorModel.findById(doctorId);
  const patients = doctor.doctor_pacientes;

  console.log(searchQuery)

  if (!searchQuery) {
    return patients;
  }
  
  const queryRegex = new RegExp(searchQuery, 'i'); // Case-insensitive regex pattern
  
  const filteredPatients = patients.filter(patient => {
    const { nombres, apellidos, celular } = patient;
    
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

exports.createDoctorPatient = async (doctorId, patientData) => {
  const doctor = await doctorModel.findById(doctorId);
  doctor.doctor_pacientes.push(patientData);
  await doctor.save();
  const newPatient = doctor.doctor_pacientes[doctor.doctor_pacientes.length - 1];
  return newPatient;
};

exports.getDoctorPatient = async (doctorId, patientId) => {
  const doctor = await doctorModel.findById(doctorId);
  const patient = doctor.doctor_pacientes.id(patientId);
  return patient;
};

exports.updateDoctorPatient = async (doctorId, patientId, patientData) => {
  const doctor = await doctorModel.findById(doctorId);
  const patient = doctor.doctor_pacientes.id(patientId);
  Object.assign(patient, patientData);
  await doctor.save();
  return patient;
};

exports.deleteDoctorPatient = async (doctorId, patientId) => {
  const doctor = await doctorModel.findById(doctorId);
  const patient = doctor.doctor_pacientes.id(patientId);
  patient.remove();
  await doctor.save();
  return patient;
};
