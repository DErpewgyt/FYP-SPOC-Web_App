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

module.exports.deleteData = function (req, res, next) {
    console.log("req.body", req.body);

    const dropQuery = "DROP TABLE IF EXISTS spoc.student;";
    const createQuery = `
      CREATE TABLE spoc.student (
        PKNo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        AdminNo VARCHAR(99) NOT NULL DEFAULT '0',
        StudentName VARCHAR(99) DEFAULT NULL,
        AttemptKeratometer INT NOT NULL DEFAULT '0',
        CompletedKeratometer INT NOT NULL DEFAULT '0',
        AttemptPhoropter INT NOT NULL DEFAULT '0',
        CompletedPhoropter INT NOT NULL DEFAULT '0'
      );
    `;

    connection
        .promise()
        .query(dropQuery)
        .then(() => connection.promise().query(createQuery))
        .then(() => {
            res.send("Table spoc.Test_Student has been dropped and recreated successfully.");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Serval Error.");
        });
};



