const courseService = require("../service/course");
// const session = require("express-session");

const ORMhandler = require("../errors/orm-error-handler");

async function getOneCourse(req, res) {
  let code = req.params.code;

  try {
    const course = await courseService.getCourseByCode(code);
    res.status(200).json(course);
  } catch (err) {
    res.status(404).send("course not found");
  }
}

async function deleteCourse(req, res) {
  let code = req.params.code;
  try {
    const course = await courseService.DeleteCourse(code);
    if (course) {
      res.status(200).send(course);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(404).send("course not found or couldn't delete");
  }
}

async function EditCourse(req, res, next) {
  let code = req.params.code;
  const { name, description } = req.body;
  let teacher_id = null;

  // if (session.user.role === "TEACHER") {
  //   const teacher_id = session.user.id;
  // } else if (session.user.role === "ADMIN") {
  //   const { teacher_id } = req.body;
  // }
  try {
    const course = await courseService.EditCourse(code, name, description);
    res.status(200).send(course);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function createCourse(req, res, next) {
  const { code, name, description } = req.body;

  let course;
  try {
    if (req.session.user && req.session.user.role === "TEACHER") {
      course = await courseService.CreateCourse(
        code,
        name,
        description,
        req.session.user.id
      );
    } else {
      course = await courseService.CreateCourse(code, name, description);
    }
    res.status(200).send(course);
    console.log(course);
  } catch (err) {
    // res.status(400).send(err);
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function addCourseToTimeTable(req, res, next) {
  const code = req.params.course_code;
  const { weekday, time } = req.body;

  try {
    const new_date = await courseService.setDateForCourseInTimeTable(
      code,
      weekday,
      time
    );
    res.status(200).json(new_date);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function removeDate(req, res, next) {
  const timeTableId = req.params.date_num;
  try {
    const deleted_date = await courseService.removeDateFromCourseTimeTable(
      timeTableId
    );
    if (deleted_date <= 0) {
      res.status(404).json("couldn't find that date");
    }
    res.status(200).json(deleted_date);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function getAllCoursesTaughtByTeacher(req, res, next) {
  const teacher_id = req.session.user.id;
  try {
    const courses = await courseService.getAllCoursesTaughtByTeacher(
      teacher_id
    );
    console.log(courses[0]);
    res.status(200).json(courses);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function searchCourses(req, res, next) {
  const search = req.params.search;
  try {
    const courses = await courseService.searchCourses(search);
    res.status(200).json(courses);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

module.exports = {
  getOneCourse,
  deleteCourse,
  EditCourse,
  createCourse,
  removeDate,
  addCourseToTimeTable,
  getAllCoursesTaughtByTeacher,
  searchCourses,
};
