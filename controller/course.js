const courseService = require("../service/course");
// const session = require("express-session");

const ORMhandler = require("../errors/errr");

async function getOneCourse(req, res) {
  let code = req.params.code;

  // code = code.autocapitalize;
  try {
    const course = await courseService.getCourseByCode(code);
    res.status(200).send(course);
  } catch (err) {
    res.status(404).send("course not found");
  }
}

async function deleteCourse(req, res) {
  let code = req.params.code;
  try {
    const course = await courseService.DeleteCourse(code);
    res.status(200).send(course);
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
    res.send(200).send(course);
  } catch (err) {
    next(err);
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
    next(ORMhandler.errorHandler(err, res, req, next));
  }
}

module.exports = { getOneCourse, deleteCourse, EditCourse, createCourse };
