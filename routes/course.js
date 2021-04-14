const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const courseController = require("../controller/course");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

const validator = require("../dao/course.validator");

router.post("/course", courseController.createCourse);
router.get("/course/:code", courseController.getOneCourse);
router.put("/course/:code", courseController.EditCourse);
router.delete("/course/:code", courseController.deleteCourse);

module.exports = router;
