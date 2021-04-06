const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const authController = require("../controller/auth");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

//Create a login endput
router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/verify/:token", authController.vertifyByToken);
router.post("/forgot_password/", authController.requestNewPassword);
router.use(authenticate);

// router.get(
//   "/order",
//   authorize(role.PARENT, role.CUSTOMER_SERVICE),
//   orderController.getOrder
// );
// router.post("/order", authorize(role.STUDENT), orderController.createOrder);
// router.delete("/order", authorize(role.TEACHER), orderController.deleteOrder);

//plug in all routes that user can access if logged in
// router.get('/profile',profileController.profile)

module.exports = router;
