const userDAO = require("../dao/user");
const bcrypt = require("bcrypt");
const { checkIfAlreadyExists } = require("../errors/auth-errors");
async function login(email, password) {
  //lookup user by email
  try {
    const user = await userDAO.findUserByEmail(email);

    //we don't need to hash the plain text password before comparing
    //bcrypt.compare will always return resolved Promise with a boolean value
    //indicating whether the password hashes match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return { id: user.id, role: user.role };
    } else {
      return Promise.reject("wrong username or password");
    }
  } catch (err) {
    return Promise.reject("user not found");
  }
}

async function signup(email, password, first_name, last_name, role, parent_id) {
  try {
    const user = await userDAO.createUser(
      email,
      password,
      first_name,
      last_name,
      role,
      parent_id
    );
    await login(email, password);
    return user;
  } catch (err) {
    await checkIfAlreadyExists(err);
    return Promise.reject(err);
  }
}

const User = require("../db/models/user");

async function verifyUserByEmail(token) {
  const user = await User.query()
    .patch({ email_verified: true })
    .where("token", `${token}`);
  console.log(token);
  console.log(user);
}
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
});

async function sendTokenByEmail(email, token) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  let info = await transporter.sendMail(
    {
      from: `"your school"`, // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hello, this is your registration token link ${token}`, // plain text body
      html: `<b>Hello this is your registration token ${token}</b>`, // html body
    },

    function (error) {
      if (error) {
        console.log("Error: " + error.message);
      } else {
        console.log("message sent");
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    }
  );
}
const crypto = require("crypto");
async function setPasswordChangeToken(email) {
  const token = crypto.randomBytes(64).toString("hex");
  let date = new Date().getTime();
  date += 2 * 60 * 60 * 1000; //expires in 2 hours
  let new_date = new Date(date).toISOString();
  await User.query()
    .patch({
      token_expiration_date: new_date,
      refresh_token: token,
    })
    .where("email", email);
  await sendForgotPasswordEmail(email, token);
}

async function sendForgotPasswordEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.email,
      pass: config.pass,
    },
  });

  let info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${config.email}>`, // sender address
    to: email, // list of receivers
    subject: "forgot password ?", // Subject line
    text: `Hello, it looks like you forgot your password. here's a token to change your password ${token}`, // plain text body
    html: `<b>Hello, it looks like you forgot your password. here's a new token <a href="${config.hostname}/forgot_password/${token}"> click here</a></b>`, // html body
  });
}
async function setNewPassword(password, token) {
  return await userDAO.changePassword(password, token);
}

async function connectParentToStudent(parent_id, student_id) {
  const student = await User.query()
    .where("id", student_id)
    .update({ parent_id: parent_id });

  return student;
}
module.exports = {
  login,
  signup,
  sendTokenByEmail,
  verifyUserByEmail,
  setPasswordChangeToken,
  setNewPassword,
  connectParentToStudent,
};
