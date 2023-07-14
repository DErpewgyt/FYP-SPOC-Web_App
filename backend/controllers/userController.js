const connection = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../config')

//login user
module.exports.loginUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT userid, username FROM user WHERE username = ? AND password = ?';
        const values = [user.username, user.password];

        connection.promise().query(sql, values)
            .then(([result]) => {
                if (result.length == 1) {
                    const token = jwt.sign({ id: result[0].userid}, config.key, {
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

