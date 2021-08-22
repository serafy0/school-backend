const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const feedbackController = require("../controller/Feedback");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.post("/", authenticate, feedbackController.createFeedback);
router.get("/:id", feedbackController.getFeedback);
router.put("/:id", feedbackController.editFeedback);
router.delete("/:id", feedbackController.removeFeedback);

module.exports = router;
