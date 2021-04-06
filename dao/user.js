const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../db/models/user");

// const users = {
//   "compliance@productioncoder.com": {
//     pwHash: bcrypt.hashSync("password", 10),
//     role: role.TEACHER,
//     id: "e0f2f9e9-2471-4af8-b0f8-ba4c73f5e147",
//   },
//   "service@productioncoder.com": {
//     pwHash: bcrypt.hashSync("password", 10),
//     role: role.TEACHER,
//     id: "8e968729-15d1-4eb3-aa1a-c4fdb3a9fb91",
//   },
// };

//this would probably be async when we use a database
// function findUserByEmail(email) {
//   const user = users[email];
//   return user ? user : Promise.reject("user not found");
// }
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
