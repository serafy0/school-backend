const { Model } = require("objection");
const User = require("./user");
const Session = require("./session");

class Course extends Model {
  static get tableName() {
    return "course";
  }

  static get idColumn() {
    return "code";
  }

  static get relationMappings() {
    return {
      parent: {
        relation: Model.BelongsToOneRelation,
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
      course_in_timetable: {
        relation: Model.HasManyRelation,
        modelClass: CourseInTimeTable,
        join: { from: "course.code", to: "course_in_timetable.course_code" },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["code", "name"],

      properties: {
        code: { type: "string", maxLength: 5 },
        name: { type: "string" },
        description: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

class CourseInTimeTable extends Model {
  static get tableName() {
    return "course_in_timetable";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["weekday", "course_time"],

      properties: {
        weekday: { type: "string" },
        course_time: { type: "date" },
      },
    };
  }
}

module.exports = Course;
