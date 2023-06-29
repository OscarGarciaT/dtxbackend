const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const profileModel = require('../models/profileModel');

exports.tokenSign = (userId, email, expiresIn) => jwt.sign({userId, email}, process.env.TOKEN_KEY, {
  expiresIn: expiresIn ?? '30d',
});

exports.getDetails = async (user) => {
  const [doctor, profile] = await Promise.all([
    doctorModel.findOne({_id: user.doctor}).lean(),
    profileModel.findOne({_id: user.profile}).lean(),
  ]);

  user.userId = `${user._id}`;
  user.doctorId = user?.doctor ?? doctor?._id;
  user.profileId = user.profile ?? profile?._id ?? null;
  user.doctor_nombre = doctor?.doctor_nombre;
  user.doctor_pacientes = doctor?.doctor_pacientes;
  user.doctor_citas = doctor?.doctor_citas;

  delete user.password;
  delete user.password_hashed;

  return user;
};
