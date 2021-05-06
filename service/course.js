const { Course, CourseInTimeTable } = require("../db/models/course");
async function getCourseByCode(code) {
  const course = await Course.query().findById(code);
  return course;
}
async function CreateCourse(code, name, description, teacher_id) {
  let new_course = null;
  new_course = await Course.query()
    .insert({
      code,
      name,
      description,
      teacher_id,
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
  const course_date = await Course.relatedQuery("course_in_timetable")
    .for(code)
    .insert({ weekday: weekday, course_time: course_time })
    .returning("*")
    .first();
  return course_date;
}

async function removeDateFromCourseTimeTable(time_id) {
  // const numberOfDeletedRows = Course.relatedQuery(
  //   "course_in_timetable"
  // ).deleteById(time_id);
  // return numberOfDeletedRows;
  return CourseInTimeTable.query().deleteById(time_id);
}

module.exports = {
  CreateCourse,
  EditCourse,
  DeleteCourse,
  setDateForCourseInTimeTable,
  getCourseByCode,
  removeDateFromCourseTimeTable,
};
