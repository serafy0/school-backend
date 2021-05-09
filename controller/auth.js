const authService = require("../service/auth");

async function login(req, res) {
  const { email, password } = req.body;

  //payload validation
  //in prod use a validation library like joi or yum
  if (!email || !password) {
    return res.status(400).json("bad request params - ");
  }
  //check if the credentials are correct
  try {
    const user = await authService.login(email, password);
    req.session.user = user;
    res.sendStatus(204);
  } catch (err) {
    //never user use console.log or console.error
    //lookup winston
    console.error(err);
    return res.status(401).json(err);
  }
}

async function signup(req, res) {
  const { email, password, first_name, last_name } = req.body;

  let parent_id = null;
  if (req.session.user && req.session.user.role === "PARENT") {
    parent_id = req.session.user.id;
  }

  //payload validation
  //in prod use a validation libirary like joi or yum
  if (!email || !password) {
    return res.status(400).json("bad request params - ");
  }
  //check if the credentials are correct
  try {
    const user = await authService.signup(
      email,
      password,
      first_name,
      last_name,
      "STUDENT",
      parent_id
    );
    // req.session.user = user;
    await authService.sendTokenByEmail(user.email, user.token);
    res.sendStatus(204);
  } catch (err) {
    //never user use console.log or console.error
    //lookup winston
    console.error(err.detail);

    return res.status(401).json(err);
  }
}
async function signupParent(req, res) {
  const { email, password, first_name, last_name } = req.body;

  //payload validation
  //in prod use a validation libirary like joi or yum
  if (!email || !password) {
    return res.status(400).json("bad request params - ");
  }
  //check if the credentials are correct
  try {
    const user = await authService.signup(
      email,
      password,
      first_name,
      last_name,
      "PARENT"
    );
    // req.session.user = user;
    await authService.sendTokenByEmail(user.email, user.token);
    res.sendStatus(204);
  } catch (err) {
    //never user use console.log or console.error
    //lookup winston
    console.error(err);
    return res.status(400).json(err);
  }
}
async function signupTeacher(req, res) {
  const { email, password, first_name, last_name } = req.body;

  //payload validation
  //in prod use a validation library like joi or yum
  if (!email || !password) {
    return res.status(400).json("bad request params - ");
  }
  //check if the credentials are correct
  try {
    const user = await authService.signup(
      email,
      password,
      first_name,
      last_name,
      "TEACHER"
    );
    // req.session.user = user;
    await authService.sendTokenByEmail(user.email, user.token);
    res.sendStatus(204);
  } catch (err) {
    //never user use console.log or console.error
    //lookup winston
    console.error(err);
    res.status(400).json(err);
  }
}

async function verifyByToken(req, res) {
  const token = req.params.token;
  console.log(token);
  try {
    await authService.verifyUserByEmail(token);

    res.status(200).json({ message: "email verified " });
  } catch (err) {
    res.status(401).json(err);
  }
}

async function requestNewPassword(req, res) {
  const { email } = req.body;
  try {
    await authService.setPasswordChangeToken(email);
    res.status(200).json({ message: "email sent" });
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
    console.log(email);
  }
}
async function SetPassword(req, res) {
  const { password } = req.body;
  const token = req.params.token;
  try {
    const user = await authService.setNewPassword(password, token);

    res.status(200).json({ message: "new password has been set" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

async function connectParentToStudent(req, res) {
  const parent_id = req.session.user.id;
  const { student_id } = req.body;
  try {
    await authService.connectParentToStudent(parent_id, student_id);
    res.status(200).send("connecting done successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send(parent_id);
  }
}

module.exports = {
  login,
  signup,
  verifyByToken,
  requestNewPassword,
  SetPassword,
  signupTeacher,
  signupParent,
  connectParentToStudent,
};
