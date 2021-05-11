const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const parentController = require("../controller/parent");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.use(authenticate);

router.get(
  "/related",
  authorize(role.PARENT),
  parentController.getRelatedStudents
);

module.exports = router;
