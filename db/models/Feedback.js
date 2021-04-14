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
        modelClass: require("/user"),
        join: {
          from: "feedback.student_id",
          to: "user.id",
        },
      },
    };
  }
}
module.exports = Feedback;
