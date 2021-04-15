const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");
const sessionController = require("../controller/session");
const role = require("../authorization/role");
const authorize = require("../authorization/authorize");

router.post("/", sessionController.createSession);
router.get("/:id", sessionController.getOneSession);
router.put("/:id", sessionController.editSession);
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
