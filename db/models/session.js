const { Model } = require("objection");

class Session extends Model {
  static get tableName() {
    return "session";
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
}

module.exports = Session;
