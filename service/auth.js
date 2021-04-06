const userDAO = require("../dao/user");
const bcrypt = require("bcrypt");

async function login(email, password) {
  //lookup user by email
  try {
    const user = await userDAO.findUserByEmail(email);

    //we don't need to hash the plain text password before comparing
    //bcrypt.compare will always return resolved Promise with a boolean value
    //indicating whether the password hashes match
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return { id: user.id, roles: user.roles };
    } else {
      return Promise.reject("wrong username or password");
    }
  } catch (err) {
    return Promise.reject("user not found");
  }
}

async function signup(email, password, first_name, last_name) {
  try {
    const user = await userDAO.createUser(
      email,
      password,
      first_name,
      last_name
    );
    await login(email, password);
    return user;
  } catch (err) {
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

  // const user = await User.query().findOne("email", "=", email);

  // const updateJennifer = await jennifer
  //     .$query()
  //     .patch({ firstName: 'J.', lastName: 'Lawrence' })
  //     .returning('*');
}
const nodemailer = require("nodemailer");

async function sendTokenByEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "karine.green79@ethereal.email",
      pass: "DHwSWVj8EuC2QZWf5f",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <karine.green79@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Hello, this is your token link ${token}`, // plain text body
    html: `<b>Hello this is your token ${token}</b>`, // html body
  });
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
      user: "darius.rosenbaum@ethereal.email",
      pass: "yRzT9ZDKknwjxjRZQq",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <karine.green79@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "forgot password ?", // Subject line
    text: `Hello, it looks like you forgot your password. here's a token to change your password ${token}`, // plain text body
    html: `<b>Hello, it looks like you forgot your password. here's a new token ${token}</b>`, // html body
  });
}

module.exports = {
  login,
  signup,
  sendTokenByEmail,
  verifyUserByEmail,
  setPasswordChangeToken,
  sendForgotPasswordEmail,
};
