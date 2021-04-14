const { Model } = require("objection");

class Session extends Model {
  static get tableName() {
    return "session";
  }

  static get idColumn() {
    return "session_id";
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./course"),
        join: {
          from: "course.code",
          to: "session.course_code",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["course_code", "session_number", "session_date"],

      properties: {
        course_code: { type: "string" },
        session_date: { type: "string" },
        session_number: { type: "integer" },
      },
    };
  }
}

module.exports = Session;
