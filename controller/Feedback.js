const feedbackService = require("../service/Feedback");

const ORMhandler = require("../errors/orm-error-handler");

// router.post("/", feedbackController.createFeedback);
// router.put("/:id", feedbackController.editFeedback);
// router.delete("/:id", feedbackController.removeFeedback);

async function createFeedback(req, res, next) {
  const written_by = req.session.user.id;
  const {
    feedback_text,
    rating,
    session_id,
    course_code,
    impulse_strategy,
    student_id,
  } = req.body;

  try {
    const feedback = await feedbackService.createFeedback(
      feedback_text,
      rating,
      impulse_strategy,
      session_id,
      course_code,
      student_id,
      written_by
    );
    res.status(200).json(feedback);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}
async function getFeedback(req, res, next) {}
async function editFeedback(req, res, next) {}
async function removeFeedback(req, res, next) {}

module.exports = { createFeedback, getFeedback, editFeedback, removeFeedback };
