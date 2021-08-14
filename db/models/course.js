const { Model } = require("objection");
const Session = require("./session");

class Course extends Model {
  static get tableName() {
    return "course";
  }

  static get idColumn() {
    return "code";
  }

  static get relationMappings() {
    //fixed require loop error https://vincit.github.io/objection.js/guide/relations.html#require-loops
    const User = require("./user");

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
          to: "user.id",
        },
      },
      course_in_timetable: {
        relation: Model.HasManyRelation,
        modelClass: CourseInTimeTable,
        join: { from: "course.code", to: "course_in_timetable.course_code" },
      },
      teacher: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: { from: "course.teacher_id", to: "user.id" },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["code", "name"],

      properties: {
        code: {
          type: "string",
          maxLength: 5,
          minLength: 1,
        },
        name: { type: "string" },
        description: { type: "string", maxLength: 255 },
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

module.exports = { Course, CourseInTimeTable };
