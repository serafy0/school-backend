const { Model } = require("objection");

class Course_Student extends Model {
  static get tableName() {
    return "course_student";
  }
}
module.exports = Course_Student;
