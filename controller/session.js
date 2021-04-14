const sessionService = require("../service/sessoin");
// const session = require("express-session");

const ORMhandler = require("../errors/errr");

async function createSession(req, res, next) {
  const { course_code, session_date } = req.body;

  try {
    const new_session = await sessionService.createSession(
      course_code,
      session_date
    );
    res.status(200).json(new_session);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function deleteSession(req, res, next) {
  const session_id = req.params.code;
  try {
    const deleted = await sessionService.removeSession(session_id);
    if (deleted <= 0) {
      res.status(404).send("session not found");
      return;
    }

    res.status(200).json(deleted);
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}
async function createAndStartSessionNow(req, res, next) {}

module.exports = { createSession, deleteSession };
