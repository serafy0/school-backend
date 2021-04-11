const { Model } = require("objection");
const User = require("./user");
const Session = require("./session");

class Course extends Model {
  static get tableName() {
    return "course";
  }

  static get relationMappings() {
    return {
      parent: {
        relation: Model.Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user.parent_id",
          to: "user.id",
        },
      },

      //sessions in courses
      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: "course.code",
          to: "session.course_code",
        },
      },
      //students
      registered_students: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "course.code",
          through: {
            from: "course_student.course_code",
            to: "course_student.student_id",
          },
        },
        to: "user.id",
      },
    };
  }
}
module.exports = Course;
