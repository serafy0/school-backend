const Feedback = require("../db/models/Feedback");

async function createFeedback(
  feedback_text,
  rating,
  session_id,
  course_code,
  student_id,
  written_by
) {
  const feedback = await Feedback.query()
    .insert({
      feedback_text,
      rating,
      session_id,
      course_code,
      student_id,
      written_by,
    })
    .returning("*")
    .first();
  return feedback;
}

async function editFeedback() {}

async function deleteFeedback() {}

async function getOneFeedback() {}

module.exports = {
  createFeedback,
  editFeedback,
  deleteFeedback,
  getOneFeedback,
};
