const parentService = require("../service/parent");

async function getRelatedStudents(req, res) {
  const parent_id = req.session.user.id;
  try {
    const students = await parentService.getRelatedStudents(parent_id);
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json(err);
  }
}

const studentService = require("../service/student");

const ORMhandler = require("../errors/orm-error-handler");

async function registerStudentToCourse(req, res, next) {
  let student_id = req.session.user.id;
  if (req.session.user.role === "PARENT") {
    const { s_id } = req.body;
    student_id = s_id;
  }
  const course_id = req.params.courseId;
  console.log(course_id);
  try {
    const student = await studentService.registerToCourse(
      student_id,
      course_id
    );
    res.status(200).json(student);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

module.exports = { getRelatedStudents, registerStudentToCourse };
