const Course = require("../db/models/course");

async function getCourseByCode(code) {
  const course = await Course.query().where("code", code).returning("*");
  return course;
}
async function CreateCourse(code, name, description, teacher_id) {
  let new_course = null;
  new_course = await Course.query()
    .insert({
      code: code,
      name: name,
      description: description,
      teacher_id: teacher_id,
    })
    .returning("*");
  return new_course
    ? new_course
    : Promise.reject("something went wrong creating a new user");
}

async function DeleteCourse(code) {
  const deleted_course = Course.query()
    .delete()
    .where("code", code)
    .returning("*")
    .first();
  return deleted_course;
}

async function EditCourse(code, name, description, teacher_id) {
  const new_course = Course.query()
    .patch({ name, description, teacher_id })
    .where("code", code)
    .returning("*")
    .first();

  return new_course;
}

async function setDateForCourseInTimeTable(code, weekday, course_time) {
  const course = await Course.query().findById(code);
  const course_date = await course.$relatedQuery("course_in_timetable").insert({
    weekday,
    course_time,
  });
}

module.exports = {
  CreateCourse,
  EditCourse,
  DeleteCourse,
  setDateForCourseInTimeTable,
  getCourseByCode,
};
