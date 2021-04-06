const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../db/models/user");

async function findUserByEmail(email) {
  const user = await User.query().findOne("email", "=", email);
  console.log(user);

  // const user = sql `select * from user where email=${email} Order`

  return user ? user : Promise.reject("couldn't find the user");
}

async function createUser(email, password, first_name, last_name) {
  const user = await User.query()
    .insert({
      email: email,
      password: bcrypt.hashSync(password, 10),
      first_name: first_name,
      last_name: last_name,
      // token_expiration_date: Date.now() + 100,
      token: first_name + crypto.randomBytes(64).toString("hex"),
    })
    .returning("*");
  return user
    ? user
    : Promise.reject("something went wrong creating a new user");
}

module.exports = { findUserByEmail, createUser };
