const { UniqueViolationError } = require("objection");

function checkIfAlreadyExists(err) {
  if (err instanceof UniqueViolationError) {
    return Promise.reject("looks like this account already exists");
  } else return err;
}

module.exports = { checkIfAlreadyExists };
