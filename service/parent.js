const Course = require("db/models/course");

async function createFeedback(
  feedback_text,
  rating,
  session_id,
  course_code,
  student_id
) {}

async function editFeedback() {}

async function deleteFeedback() {}

async function getOneFeedback() {}

module.exports = {
  createFeedback,
  editFeedback,
  deleteFeedback,
  getOneFeedback,
};
