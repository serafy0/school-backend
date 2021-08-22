const Feedback = require("../db/models/Feedback");
const { Course } = require("../db/models/course");

async function createFeedback(
  feedback_text,
  rating,
  impulse_strategy,
  session_id,
  course_code,
  student_id,
  written_by
) {
  const feedback = await Feedback.query()
    .insert({
      feedback_text,
      rating,
      impulse_strategy,
      session_id,
      course_code,
      student_id,
      written_by,
    })
    .returning("*")
    .first();
  return feedback;
}

async function editFeedback(editedFeedback, feedbackId) {
  const new_feedback = await Feedback.query()
    .patch(editedFeedback)
    .where("id", feedbackCode)
    .returning("*")
    .first();
}

async function deleteFeedback(id) {
  const deleted_feedback = Feedback.query()
    .delete()
    .where("id", id)
    .returning("*")
    .first();
  return deleted_course;
}

async function getOneFeedback() {}

module.exports = {
  createFeedback,
  editFeedback,
  deleteFeedback,
  getOneFeedback,
};
