const User = require("../db/models/user");

async function getRelatedStudents(parent_id) {
  const students = await User.query()
    .select("id", "email", "first_name", "last_name", "created_at")
    .where("parent_id", parent_id)
    .orderBy("created_at", "desc");

  return students;
}

module.exports = { getRelatedStudents };
