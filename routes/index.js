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

//teacher signup and registration
router.post("/teacher/login");
router.post("/teacher/signup");

//parent signup and registration
router.post("/teacher/signup", authController.signupTeacher);
router.post("/parent/signup", authController.signupParent);

router.use(authenticate);

router.post(
  "/parent/connect",
  authorize(role.PARENT),
  authController.connectParentToStudent
);

module.exports = router;
