const express = require("express");
const router = express.Router();

const controller = require("../controllers/studentController");

router.get("/", controller.getAllStudent);
router.delete("/", controller.deleteData);

module.exports = router;


// router.get('/students', function(req, res) {
//     // Get the students from the database.
//     const students = getStudentsFromDatabase();
  
//     // Return a response with the students.
//     res.send(students);
//   });