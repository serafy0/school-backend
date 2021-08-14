const User = require("../db/models/user");
async function registerToCourse(student_id, course_id) {
  try {
    const student = User.query().findById(student_id);

    const courseRelation = await User.relatedQuery("registered_courses")
      .for(student)
      .relate(course_id);
    return courseRelation;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { registerToCourse };
