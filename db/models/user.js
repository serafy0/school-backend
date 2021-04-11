const { Model } = require("objection");
const { Course } = require("./course");
class User extends Model {
  static get tableName() {
    return "user";
  }

  static get relationMappings() {
    return {
      //student has one parent
      parent: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user.parent_id",
          to: "user.id",
        },
      },
      //student has many registered courses
      registered_courses: {
        relation: Model.ManyToManyRelation,
        modelClass: Course,
        join: {
          from: "user.id",
          through: {
            from: "course_student.student_id",
            to: "course_student.course_code",
          },
        },
        to: "course.code",
      },
    };
  }
}
module.exports = User;
