const Session = require("../db/models/session");

async function createSession(course_code, session_date) {
  let new_session = null;
  console.log(Session.query().count("session_id").toKnexQuery().toSQL());
  new_session = await Session.query()
    .insert({
      course_code,
      session_date,
      session_number: (await Session.query().resultSize()) + 1,
    })
    .returning("*");
  return new_session
    ? new_session
    : Promise.reject("something went wrong creating a new session");
}

async function removeSession(session_id) {
  return Session.query().deleteById(session_id);
}

module.exports = { createSession, removeSession };