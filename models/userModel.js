const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: { type: Schema.Types.String, required: true },
    password_hashed: { type: Boolean },
    role: {
      type: Schema.Types.String,
      enum: ["ADMIN", "DOCTOR"],
      default: "DOCTOR",
    },
    doctor: { type: Schema.Types.ObjectId },
    profile: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
	let user = this;
	if (!user.isModified("password") || !!user.password_hashed) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			user.password_hashed = true;
			next();
		});
	});
});

userSchema.methods.passwordEquals = async (password, passwordHash) => {
	const match = await bcrypt.compare(password, passwordHash);
	return match;
};

module.exports = mongoose.model("user", userSchema);
