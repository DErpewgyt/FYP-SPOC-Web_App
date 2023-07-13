const connection = require('../db');

module.exports.getAllStudent = function (req, res, next) {

    console.log("req.body", req.body);
    const sql = `SELECT * FROM spoc.student;`;
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}