const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const courseController = require("../controller/course");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.post("/", courseController.createCourse);
router.post("/add", courseController.createCourse);
router.get("/:code", courseController.getOneCourse);
router.put("/:code", courseController.EditCourse);
router.delete("/:code", courseController.deleteCourse);

router.get("/find/:search", courseController.searchCourses);

router.post(
  "/set_in_table/:course_code",
  courseController.addCourseToTimeTable
);

router.delete(
  "/date_in_table/:date_num",
  authorize(role.TEACHER),
  courseController.removeDate
);

router.get(
  "/teacher/taught_by",
  authorize(role.TEACHER),
  courseController.getAllCoursesTaughtByTeacher
);

module.exports = router;
