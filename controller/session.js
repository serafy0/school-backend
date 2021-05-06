const sessionService = require("../service/sessoin");

const ORMhandler = require("../errors/orm-error-handler");

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
  const session_id = req.params.id;
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

// async function createAndStartSessionNow(req, res, next) {}

async function getOneSession(req, res, next) {
  const session_id = req.params.id;
  try {
    const session = await sessionService.getOneSession(session_id);
    if (session > 0) {
      res.status(200).json(session);
    } else {
      res.status(404).json({ message: "session not found" });
    }
  } catch (err) {
    ORMhandler.errorHandler(err, res, req, next);
  }
}

async function editSession(req, res, next) {
  const session_id = req.params.id;
  const { new_date } = req.body;
  try {
    const new_session = await sessionService.editSession(session_id, new_date);
    res.status(200).json(new_session);
  } catch (err) {
    ORMhandler(err, req, res, next);
  }
}

module.exports = { createSession, deleteSession, getOneSession, editSession };
