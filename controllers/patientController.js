const patientManager = require('../managers/patientManager');

exports.getAll = async (req, res) => {
  try {
    const {doctorId} = req.params;
    const {searchQuery: query} = req.query;

    const patients = await patientManager.getAllDoctorPatients(doctorId, query);

    res.status(200).send(patients);
  } catch (err) {
    console.error(err?.message);
    res.status(500).send({message: 'Internal server error'});
  }
};

exports.create = async (req, res) => {
  try {
    const {doctorId} = req.params;

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
      newPatientData,
    );

    res.status(200).send(patient);
  } catch (err) {
    console.error(err?.message);
    res.status(500).send({message: 'Error interno del servidor'});
  }
};

exports.get = async (req, res) => {
  const {doctorId, patientId} = req.params;
  const patient = await patientManager.getDoctorPatient(doctorId, patientId);
  res.status(200).send(patient);
};

exports.update = async (req, res) => {
  const {doctorId, patientId} = req.params;

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
    diagnosticos,
    tratamientos,
  } = req.body.patientData;

  const newDiagnosticos = diagnosticos?.map((diag) => ({
    ...diag,
    canEdit: false,
  }));

  const newTratamientos = tratamientos?.map((trat) => ({
    ...trat,
    canEdit: false,
  }));

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
    diagnosticos: newDiagnosticos ?? [],
    tratamientos: newTratamientos ?? [],
  };

  const patient = await patientManager.updateDoctorPatient(
    doctorId,
    patientId,
    newPatientData,
  );

  res.status(200).send(patient);
};

exports.delete = async (req, res) => {
  const {doctorId, patientId} = req.params;
  const patient = await patientManager.deleteDoctorPatient(doctorId, patientId);
  res.status(200).send(patient);
};

exports.createAppointment = async (req, res) => {
  const {doctorId} = req.params;

  const {paciente_id, fecha_cita, hora_inicio_cita, hora_fin_cita, motivo} =
    req.body.appointmentData;

  const newAppointmentData = {
    paciente_id,
    fecha_cita,
    hora_inicio_cita,
    hora_fin_cita,
    motivo,
  };

  const patient = await patientManager.createDoctorAppointment(
    doctorId,
    newAppointmentData,
  );
  res.status(200).send(patient);
};

exports.appointments = async (req, res) => {
  try {
    const {doctorId} = req.params;
    const appointments = await patientManager.getAllDoctorAppointments(doctorId);
    res.status(200).send(appointments);
  } catch (err) {
    console.error(err?.message);
    res.status(500).send({message: 'Internal server error'});
  }

};
