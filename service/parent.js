const User = require("../db/models/user");

async function getRelatedStudents(parent_id) {
  const students = User.query()
    .select("id", "email", "first_name", "last_name")
    .where("parent_id", parent_id);

  return students;
}

module.exports = { getRelatedStudents };
