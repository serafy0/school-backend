const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authController = require("../controller/auth");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

//Create a login endpoint
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/verify/:token", authController.verifyByToken);
router.post("/forgot_password/", authController.requestNewPassword);
router.post("/forgot_password/:token", authController.SetPassword);

//parent signup and registration
router.post("/teacher/signup", authController.signupTeacher);
router.post("/parent/signup", authController.signupParent);

router.all("/checklogin", (req, res) => {
  // res.status(req.session.id ? 200 : 401).send(re)
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(401).send("not ok :(");
  }
});

router.post("/logout", async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    res.clearCookie("sessionId");

    res.status(200).send("OK");
  });
});

router.use(authenticate);

router.post(
  "/parent/connect",
  authorize(role.PARENT),
  authController.connectParentToStudent
);

module.exports = router;
