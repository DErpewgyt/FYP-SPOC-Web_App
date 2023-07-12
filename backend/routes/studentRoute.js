const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");
router.get("/studentlist", controller.getStudent)

module.exports = router;