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
          to: "course.code",
        },
      },

      feedbacks: {
        relation: Model.HasManyRelation,
        modelClass: "/Feedback",
        from: "user.id",
        to: "feedback.student_id",
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(query) {
        query.select("id", "first_name", "last_name", "email");
      },
      selectWithFeedbacks(query) {
        query
          .select("id", "first_name", "last_name", "email")
          .withGraphFetched("feedback");
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password", "first_name"],

      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        role: { type: "string" },
        parent_id: "string",
      },
    };
  }
}
module.exports = User;
