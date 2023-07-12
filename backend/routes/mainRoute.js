const express = require("express");
const router = express.Router();



const userRoute = require("./userRoute");
const studentRoute = require("./studentRoute");

router.use("/user", userRoute);
router.use("/studentlist", studentRoute);




module.exports = router;