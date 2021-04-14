const { Model } = require("objection");

class Comment extends Model {
  static get tableName() {
    return "comment";
  }
}

module.exports = { Comment };
