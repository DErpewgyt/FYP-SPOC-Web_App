const connection = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../config')

//register user details
module.exports.RegisterUser = (req, res, next) => {
    const sql = `INSERT INTO user (username, password) VALUES (?,?)`;
    const values = [req.body.username, req.body.password];
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            success: false,
            data: 'Please enter username and password'
        })
    }
    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            if (error.code == 'ER_DUP_ENTRY') {
                return res.status(409).send({
                    success: false,
                    data: 'Username already exists!'
                })
            }
            res.status(422).send(error);
        });
    // res.send("success");
}

//login user
module.exports.loginUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT userid, username, main_slime, bal, role FROM user WHERE username = ? AND password = ?';
        const values = [user.username, user.password];

        connection.promise().query(sql, values)
            .then(([result]) => {
                if (result.length == 1) {
                    const token = jwt.sign({ id: result[0].userid, role: result[0].role }, config.key, {
                        expiresIn: 86400 //expires in 24 hrs
                    });
                    console.log("@@token " + token);
                    resolve([token, result]);
                } else {
                    let err2 = new Error("UserID/Password does not match.");
                    err2.statusCode = 500;
                    reject(err2);
                }
            })
            .catch((error) => {
                console.log("Err: " + err);
                reject(err);
            });
    })
}

//update user details
module.exports.updateUserDetails = (req, res, next) => {
    const sql = `UPDATE user SET username = ?, password = ?, bio = ?, avatar = ? WHERE userid = ?`;
    const values = [req.body.username, req.body.password, req.body.bio, req.body.avatar, req.params.userid];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

//set profile
module.exports.setProfile = (req, res, next) => {
    const sql = `UPDATE user SET bio = ?, avatar = ? WHERE userid = ?`;
    const values = [req.body.bio, req.body.avatar, req.params.userid];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

//get user details by username
module.exports.getUserDetails = (req, res, next) => {
    const sql = `SELECT userid, username, bio, avatar FROM user WHERE user.username LIKE ?`;

    const values = [req.params.username + `%`];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

//send friend request
module.exports.sendFriendRequest = (req, res, next) => {

    const sql = `INSERT INTO friendship (requester, requested) VALUES (?,?)`;

    const values = [req.id, req.body.requested];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json(result);
        })
        .catch((error) => {
            res.status(422).send(error);
        });
    // res.send("success");
}

//check if friendship already exists
module.exports.checkIfFriendshipReqExist = (req, res, next) => {
    // const {
    //     requester,
    //     requested
    // } = req.body;

    const sql = `SELECT * FROM friendship WHERE (requester = ? AND requested = ?) OR (requester = ? AND requested = ?)`;

    const values = [
        req.id, req.body.requested, req.body.requested, req.id
    ]

    connection.promise().query(sql, values)
        .then(([result]) => {

            console.log("Results")
            // console.log(result)

            // If there is result
            if (result.length === 0) {
                console.log("No friends found")
                return next()

            } else {

                return res.status(400).send({
                    "error": "Friendship exists"
                })

            }

        })
        .catch((error) => {
            return res.status(422).send(error);
        });

}

//get all friendship connections wheter pending or accepted
module.exports.getFriendshipDetails = (req, res, next) => {


    // 1. Select from friendship table where requested or requester = req.id
    const sql = `SELECT * FROM friendship WHERE requester = ? OR requested = ?`;

    const values = [req.id, req.id];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");         
}

//get all pending friendship connections
module.exports.getPendingFriendshipDetails = (req, res, next) => {


    // 1. Select from friendship table where requested or requester = req.id
    const sql = `SELECT u.userid, u.username, u.bio, u.avatar, f.friendshipid FROM friendship f
    JOIN user u
    ON f.requester = u.userid
    WHERE f.requested = ? AND f.accepted = 0`;

    const values = [req.id];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");         
}

module.exports.acceptFriendship = (req, res, next) => {
    const sql = `UPDATE friendship SET accepted = 1 WHERE friendshipid = ? AND requested = ?`;

    const values = [req.body.friendshipid, req.id];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");         
}

//get all friendships
module.exports.getFriendList = (req, res, next) => {


    // 1. Select from friendship table where requested or requester = req.id
    const sql = `SELECT u.userid, u.username, u.bio, u.avatar FROM user u
    JOIN friendship f
    ON f.requested = u.userid
    OR
    f.requester = u.userid
    WHERE (f.requested = ? OR f.requester = ?) AND f.accepted = 1 AND u.userid != ?`;

    const values = [req.id, req.id, req.id];

    connection.promise().query(sql, values)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");         
}

//user registration per month
module.exports.userD3GraphYearSelection = function (req, res, next) {

    const sql = `SELECT distinct year(dateofcreation) as 'year' from user order by (year)desc`;

    connection.promise().query(sql)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
}

//user registration per month
module.exports.userD3Graph = function (req, res, next) {

    const sql = `SELECT count(username) AS 'usercount', month(dateofcreation) as 'month'
    FROM user WHERE year(dateofcreation) = ?
    GROUP BY month(dateofcreation) ORDER BY month(dateofcreation) `;

    const values = [req.params.year];

    connection.promise().query(sql, values)
        .then(([rows]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}

//get all users
module.exports.getAllUsernames = (req, res, next) => {
    const sql = `SELECT username FROM user`;
    connection.promise().query(sql)
        .then(([result]) => {
            console.log(result);
            res.json({
                success: true,
                data: result
            });
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");         
}

//informative bulk insert
module.exports.bulkInsert = function(newusers) {
    // TODO implement bulk create
    console.log('newmods')
    console.log(newusers)
    const sql = `INSERT INTO user (username, password, dateofcreation) VALUES ?`;
    return connection.promise().query(sql, [newusers])
    .catch(function (error) {
        // if (error.errno === MYSQL_ERROR_CODE.DUPLICATE_ENTRY) {
        //     throw new DUPLICATE_ENTRY_ERROR(`Module already exists`);
        // }
        throw error;
    }); 
};



