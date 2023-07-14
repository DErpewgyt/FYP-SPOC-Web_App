const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const isTokenValid = require("../middlewares/isTokenValid");

//login
router.post("/login", (req, res) => {
    controller.loginUser(req.body)
        .then(
            ([token, result]) => {
                console.log(result);

                return res.status(200).json(
                    { success: true, UserData: result, token, status: 'You are successfully logged in!' }
                )
            }
        ).catch(
            (err) => {
                res.status(500).send(err);
            }
        )
});

module.exports = router;