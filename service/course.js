const { Course, CourseInTimeTable } = require("../db/models/course");
async function getCourseByCode(code) {
  const course = await Course.query()
    .findById(code)
    .withGraphFetched(
      "[course_in_timetable ," +
        " registered_students(defaultSelects)," +
        "teacher(defaultSelects),sessions(defaultSelects)]"
    );
  console.log(course);

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
  const new_course = await Course.query()
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
  return CourseInTimeTable.query().deleteById(time_id);
}

//probably should be in a separate teacher.service.js file
async function getAllCoursesTaughtByTeacher(teacher_id) {
  const courses = await Course.query()
    .where("teacher_id", teacher_id)
    .withGraphFetched("course_in_timetable");

  return courses;
}

// async function getAllCoursesRegisteredByUser(user_id) {
//   const users = await Course.relatedQuery("registered_students");
// }

async function searchCourses(searchKeyword, pageNum) {
  const courses = await Course.query()
    .where("name", "like", `%${searchKeyword}%`)
    .orWhere("description", "like", `%${searchKeyword}%`);

  return courses;
}

module.exports = {
  CreateCourse,
  EditCourse,
  DeleteCourse,
  setDateForCourseInTimeTable,
  getCourseByCode,
  removeDateFromCourseTimeTable,
  getAllCoursesTaughtByTeacher,
  searchCourses,
};
