const Session = require("../db/models/session");
const { Course } = require("../db/models/course");

async function createSession(course_code, session_date) {
  let new_session = null;
  console.log(Session.query().count("session_id").toKnexQuery().toSQL());
  new_session = await Session.query()
    .insert({
      course_code,
      session_date,
      session_number:
        (await Session.query().where("course_code", course_code).resultSize()) +
        1,
    })
    .returning("*");
  return new_session
    ? new_session
    : Promise.reject("something went wrong creating a new session");
}

async function removeSession(session_id) {
  return Session.query().deleteById(session_id);
}

async function getOneSession(session_id) {
  return Session.query().findById(session_id);
}
async function getOneSessionWithStudents(session_id) {
  const session = await Session.query()
    .findById(session_id)
    .withGraphFetched("[course.[registered_students.[feedbacks]]]");
  return session;
}

async function editSession(session_id, session_date) {
  return Session.query()
    .patch({ session_date })
    .where("session_id", session_id)
    .returning("*")
    .first();
}

module.exports = {
  createSession,
  removeSession,
  getOneSession,
  editSession,
  getOneSessionWithStudents,
};
