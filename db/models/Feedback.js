const { Model } = require("objection");

class Feedback extends Model {
  static get tableName() {
    return "feedback";
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: require("./comment"),
        join: {
          from: "feedback.id",
          to: "comment.feedback_id",
        },
      },
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./user"),
        join: {
          from: "feedback.student_id",
          to: "user.id",
        },
      },
      session: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./session"),
        join: {
          from: "feedback.session_id",
          to: "session_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["feedback_text", "rating"],

      properties: {
        feedback_text: { type: "string" },
        rating: { type: "integer" },
        impulse_strategy: {
          type: "string",
          enum: ["angry", "happy", "sad", "none"],
        },
        session_id: {
          type: "integer",
        },
        course_code: {
          type: "string",
        },
        student_id: {
          type: "string",
        },
        written_by: {
          type: "string",
        },
        additionalProperties: false,
      },
    };
  }
}
module.exports = Feedback;
