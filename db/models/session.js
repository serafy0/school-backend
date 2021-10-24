const { Model } = require("objection");

class Session extends Model {
  static get tableName() {
    return "session";
  }

  static get idColumn() {
    return "session_id";
  }

  static get relationMappings() {
    const { Course } = require("./course");
    const { Feedback } = require("./Feedback");
    return {
      comments: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./course"),
        join: {
          from: "course.code",
          to: "session.course_code",
        },
      },
      feedback: {
        relation: Model.HasManyRelation,
        modelClass: Feedback,
        join: {
          from: "feedback.session_id",
          to: "session.session_id",
        },
      },
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: "session.course_code",
          to: "course.code",
        },
      },
    };
  }
  static get modifiers() {
    return {
      defaultSelects(query) {
        query
          .select("session_id", "session_date", "session_number")
          .withGraphFetched("feedback")
          .orderBy("session_date", "asc");
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["course_code", "session_number", "session_date"],

      properties: {
        course_code: { type: "string" },
        session_date: { type: "string", format: "date-time" },
        session_number: { type: "integer" },
      },
    };
  }
}

module.exports = Session;
