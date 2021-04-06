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

async function changePassword(password, token) {
  let date = new Date().getTime();
  // date += 2 * 60 * 60 * 1000; //expires in 2 hours
  let new_date = new Date(date).toISOString();

  const user = await User.query()
    .where("refresh_token", token)
    .andWhere("token_expiration_date", ">", new_date)

    .update({
      password: bcrypt.hashSync(password, 10),
      token_expiration_date: null,
      refresh_token: null,
    })
    .returning("*")
    .first();
  // .where(refresh_token,token).andWhere(refresh_token,"<",new Date.now());
  console.log(user);
  return user ? user : Promise.reject("token expired or invalid");
}

module.exports = { findUserByEmail, createUser, changePassword };
