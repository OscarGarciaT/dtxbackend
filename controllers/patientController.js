const patientManager = require("../managers/patientManager");

exports.getAll = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { searchQuery } = req.query;

    console.log(JSON.stringify(req.query))

    const patients = await patientManager.getAllDoctorPatients(doctorId, searchQuery);
    res.status(200).send(patients);
  } catch (err) {
    console.error(err?.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const {
      antecedentes_familiares,
      antecedentes_personales,
      enfermedad_problema_actual,
      indices_cpo_cbo,
      info_general,
      motivo_consulta,
      planes_varios,
      salud_bucal,
      signos_vitales,
      sistema_estomatognatico,
    } = req.body.patientData;

    const newPatientData = {
      nombres: info_general?.nombres,
      apellidos: info_general?.apellidos,
      cedula: info_general?.cedula,
      celular: info_general?.celular,
      sexo: info_general?.sexo,
      edad: info_general?.edad,
      antecedentes_familiares,
      antecedentes_personales,
      enfermedad_problema_actual,
      indices_cpo_cbo,
      info_general,
      motivo_consulta,
      planes_varios,
      salud_bucal,
      signos_vitales,
      sistema_estomatognatico,
    };

    const patient = await patientManager.createDoctorPatient(
      doctorId,
      newPatientData
    );

    res.status(200).send(patient);
  } catch (err) {
    console.error(err?.message)
    res.status(500).send({ message: "Error interno del servidor" });
  }
};

exports.get = async (req, res) => {
  const { doctorId, patientId } = req.params;
  const patient = await patientManager.getDoctorPatient(doctorId, patientId);
  res.status(200).send(patient);
};

exports.update = async (req, res) => {
  const { doctorId, patientId } = req.params;
  const patientData = req.body;
  const patient = await patientManager.updateDoctorPatient(
    doctorId,
    patientId,
    patientData
  );
  res.status(200).send(patient);
};

exports.delete = async (req, res) => {
  const { doctorId, patientId } = req.params;
  const patient = await patientManager.deleteDoctorPatient(doctorId, patientId);
  res.status(200).send(patient);
};
