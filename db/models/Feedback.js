const { Model } = require("objection");

class Feedback extends Model {
  static get tableName() {
    return "feedback";
  }
}
module.exports = Feedback;
