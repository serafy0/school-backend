const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const sessionController = require("../controller/session");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.post("/", sessionController.createSession);
router.get("/:code");
router.put("/:code");
router.delete("/:code", sessionController.deleteSession);

module.exports = router;
