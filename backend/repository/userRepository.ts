import db from "../models";
const bcrypt = require("bcrypt");

exports.findUserEmail = async (email: string) => {
  return db.User.findOne({
    where: {
      email: email,
    },
  });
};
exports.createNewUser = async (
  firstName: any,
  lastName: any,
  email: any,
  password: any,
  password_confirmation: any
) => {
  const salt = await bcrypt.genSalt(13);
  const hashPassword = await bcrypt.hash(password, salt);
  return await db.User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
    password_confirmation: hashPassword,
    // image: image,
  });
};
exports.findUserById = async (id: any) => {
  return await db.User.findByPk(id);
};



