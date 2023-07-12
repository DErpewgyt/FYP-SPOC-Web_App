const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const isTokenValid = require("../middlewares/isTokenValid");

//register
router.post("/register", (req, res, next) => {
    if (req.body.password !== req.body.reenterpassword) return res.status(422).send("passwords do not match");
    next();
}, controller.RegisterUser);

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

//update user details
router.put("/update/:userid", controller.updateUserDetails);

//set profile
router.put("/setprofile/:userid", controller.setProfile);

//get user details by username
router.get("/getdetails/:username", controller.getUserDetails);

//send friend request
router.post("/sendfriendrequest", isTokenValid, controller.checkIfFriendshipReqExist, controller.sendFriendRequest);

// Get friendship details whether pending or accepted
router.get("/friendship", isTokenValid, controller.getFriendshipDetails)

//Get pending friendship details
router.get("/pendingfriendship", isTokenValid, controller.getPendingFriendshipDetails)

// Accept friendship
router.post("/friendship", isTokenValid, controller.acceptFriendship)

//View friendlist
router.get("/friendlist", isTokenValid, controller.getFriendList)

//Get year user registration
router.get("/d3year", controller.userD3GraphYearSelection)

//View user registration by month
router.get("/d3/:year", controller.userD3Graph)

//get all usernames
router.get("/getallusernames", controller.getAllUsernames)

//informative
router.post("/informative", function (req, res, next) {
    // TODO: Implement bulk insert modules
    const NewArray = req.body.allUsers
    // res.json(NewArray)
    return controller
        .bulkInsert(NewArray.map(item=>([
            item.username,
            item.password,
            new Date(new Date(item.created).getTime()).toISOString().slice(0,19).replace('T', ' ')
        ])))
        .then(function (result) {
            console.log('IM SO SORRY', result)
            return res.sendStatus(201);
        })
        .catch(function (error) {
            console.error(error);
            console.log('IM NOT SORRY', error)
            // if (error instanceof DUPLICATE_ENTRY_ERROR) {
            //     return res.status(400).json({ error: error.message });
            // } else
             return res.status(500).json({ error: 'Unknown Error' });
        });
}); 

module.exports = router;