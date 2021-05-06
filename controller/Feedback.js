const feedbackService = require("../service/Feedback");

const ORMhandler = require("../errors/orm-error-handler");

// router.post("/", feedbackController.createFeedback);
// router.put("/:id", feedbackController.editFeedback);
// router.delete("/:id", feedbackController.removeFeedback);

async function createFeedback(req, res, next) {}
async function getFeedback(req, res, next) {}
async function editFeedback(req, res, next) {}
async function removeFeedback(req, res, next) {}

module.exports = { createFeedback, getFeedback, editFeedback, removeFeedback };
