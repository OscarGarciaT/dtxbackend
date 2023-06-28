const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const profileModel = require("../models/profileModel")

const userManager = require("../managers/userManager");

const parse = (auth) => {
	if (!auth || typeof auth !== "string") {
		return false;
	}
	let result = {},
		parts,
		decoded,
		colon;
	parts = auth.split(" ");
	result.scheme = parts[0];

	if (result.scheme.toLowerCase() === "bearer") {
		return parts[1];
	}
	if (result.scheme.toLowerCase() !== "basic") {
		return result;
	}
	decoded = new Buffer(parts[1], "base64").toString("binary");
	colon = decoded.indexOf(":");
	result.username = decoded.substr(0, colon);
	result.password = decoded.substr(colon + 1);
	return result;
};

exports.auth = async (req, res) => {
  let user;

  console.log("inside authorization")

  const authHeader = parse(req.headers["authorization"]);
  if (!authHeader) {
    return res.status(401).send({ message: "Auth error" });
  }

  user = await userModel.findOne({
    email: authHeader.username,
  });

  if (!user) {
    return res.status(401).send({ message: "Email o contraseña incorrectos" });
  }

  const aPwdHash = user.password;

  const validPwd = await new userModel().passwordEquals(
    authHeader.password,
    aPwdHash
  );

  if (!validPwd) {
    return res.status(401).send({ message: "Email o contraseña incorrectos" });
  }

  // For intenal user expiration of token should be set to lower value
  const expiresIn = "30d";
  const doc = await userManager.getDetails(user.toObject());

  doc.authorization_token = userManager.tokenSign(
    user._id,
    user.email,
    expiresIn
  );

  return res.status(200).send(doc);
};

exports.createUser = async (req, res) => {
  try {
    let email = req.body.email.toLowerCase();
    let user = await userModel.findOne({ email }).exec();
    if (!user) {
      let data_user = req.body;
      data_user.email = data_user.email.toLowerCase();

      if (req.body.email.includes("+")) {
        const errorMessage = "Email aliases are not supported, '+' is allowed";
        return res.status(400).send({ error: { message: errorMessage } });
      }

      let reference_data = await createDoctorByUser(data_user);
      let data_doctor = reference_data?.[0];
      if (!data_doctor) {
        return res.status(400).send({ message: "Error creating doctor user" });
      }

      data_user.role = "DOCTOR";
      data_user.doctor = data_doctor._id;
      data_user.profile = data_doctor.profile;

      await createNewUser(req, res, data_user, data_doctor);
    } else {
      return res.status(403).send({
        error: { message: "User already exists" },
      });
    }
  } catch (err) {
    console.error("[userController] ERROR: " + err);
    return res.status(500).send({ message: "Internal server error" });
  }
};

async function createDoctorByUser(req) {
  let nombre = req.nombres + " " + req.apellidos;
  let email = req.email;
  let telefono = req.telefono;
  let cargo = req.cargo;

  let profile;
  try {
    profile = await profileModel.findOne({ email }).exec();
    if (!profile) {
      profile = await profileModel.create({
        nombres: req.nombres,
        apellidos: req.apellidos,
        telefono,
        email,
      });
    }
  } catch (err) {
    console.log(JSON.stringify(req))
    throw new Error("Error creating profile on DB");
  }

  let doctorData = {
    doctor_nombre: nombre,
    doctor_telefono: telefono,
    doctor_role: cargo,
    profile: profile._id,
    user_email: email,
    pacientes: [],
    citas: [],
  };

  try {
    let new_doctor = await doctorModel.create([doctorData], { new: true });
    return new_doctor;
  } catch (err) {
    console.log("[userController]", err);
    throw new Error("Error creating doctor on DB");
  }
}

async function createNewUser(req, res, user, doctor) {
  if (!user.doctor || !user.profile) {
    throw new Error("Missing to create profile, please try again later");
  }

  try {
    let usr = await userModel.create(user);
    const userDetails = await userManager.getDetails(usr);
    delete user.password;
    const token = userManager.tokenSign(user._id, usr.email.toLowerCase());
    const response_object = {
      authorization_token: token,
      doctorId: doctor._id + "",
      userId: usr._id + "",
      ...userDetails,
    };

    return res.status(200).send(response_object);
  } catch (err) {
    console.log("[userController]", err);
    throw new Error("Error creating user on DB");
  }
}
