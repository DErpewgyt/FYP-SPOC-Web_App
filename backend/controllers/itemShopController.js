const { response } = require('express');
const { query } = require('../db');
const connection = require('../db');
// Gacha Item
module.exports.gachaItem = function (req, res, next) {
    // console.log("req.body", req.body);

    const sql = `INSERT INTO playerItemInventory (userId,itemId,qty) VALUES (?,?,?)`;
    const values = [req.params.id, req.params.itemId, 1];

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// Add qty (for gacha item)
module.exports.addQty = function (body, res) {
    var qty = body.body.body[0]
    var userId = body.body.body[1]
    var itemId = body.body.body[2]
    // console.log('qty',qty);
    // console.log('userId',userId);
    // console.log('itemId',itemId);
    // console.log('body', body.body.body[0]);

    var sql = `UPDATE playerItemInventory SET qty = ? WHERE userId = ? AND itemId = ?`;
    var values = [qty, userId, itemId];

    connection.promise().query(sql, values)
        .then(([rows]) => {
            console.log("updated qty");
            res.json(rows)
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

// Update qty (for item inventory)
module.exports.updateQty = function (body, res) {
    var qty = body.body.body[2]
    var userId = body.body.body[0]
    var invId = body.body.body[1]
    // console.log('qty',qty);
    // console.log('userId',userId);
    // console.log('itemId',itemId);
    // console.log('body', body.body.body[0]);

    var sql = `UPDATE playerItemInventory SET qty = ? WHERE userId = ? AND invId = ?`;
    var values = [qty, userId, invId];

    connection.promise().query(sql, values)
        .then(([rows]) => {
            console.log("updated qty");
            res.json(rows)
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

// check if item exists in current table (for gacha item)
module.exports.checkItem = function (req, res, next) {
    // console.log(req.query.body[0]);
    // console.log("hello backend");
    var userId = req.query.body[0];
    var itemId = req.query.body[1];

    var sql = `SELECT qty FROM playerItemInventory WHERE userId = ? AND itemId = ?`;
    var values = [userId, itemId];

    connection.promise().query(sql, values)
        .then(([response]) => {
            console.log("response", response);
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        });
}

// get itemId of item with the inventory Id
module.exports.getItemId = function (req, res, next) {
    // console.log(req.query.body[0]);
    // console.log("hello backend");
    var invId = req.query.body[0];

    var sql = `SELECT itemId FROM playerItemInventory WHERE invId = ?`;
    var values = [invId];

    connection.promise().query(sql, values)
        .then(([response]) => {
            console.log("response", response);
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        });
}

// check quantity of certain item (for inventory)
module.exports.checkQty = function (req, res, next) {
    // console.log(req.query.body[0]);
    // console.log("hello backend");
    var userId = req.query.body[0];
    var itemId = req.query.body[1];

    var sql = `SELECT qty FROM playerItemInventory WHERE userId = ? AND invId = ?`;
    var values = [userId, itemId];

    connection.promise().query(sql, values)
        .then(([response]) => {
            console.log("response", response);
            res.send(response);
        })
        .catch((error) => {
            res.send(error);
        });
}

//get image
module.exports.getImage = function (req, res, next) {
    const sql = `SELECT image from items WHERE itemId = ?`;
    const values = [req.params.id];

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// get the name of the item
module.exports.getName = function (req, res, next) {
    const sql = `SELECT itemName from items WHERE itemId = ?`;
    const values = [req.params.id];

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// Retrieve all item
module.exports.getAllItem = function (req, res, next) {
    const sql = `SELECT p.invId, i.image, i.itemName, i.itemDescription, p.qty FROM items AS i INNER JOIN playerItemInventory AS p ON p.itemId = i.itemId WHERE userId = ?;`;
    const values = [req.params.id];

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// Retrieve all items listed (for trade items)
module.exports.getListedItems = function (req, res, next) {
    const sql = `SELECT u.username, i.itemName, i.itemDescription, i.image, l.price, l.listedItemId, l.itemId, u.userid FROM listedItems as l INNER JOIN user as u ON u.userid = l.listedBy INNER JOIN items as i ON l.itemId = i.itemId WHERE l.status = 'listed';`;

    connection.promise().query(sql)
        .then(([rows]) => {
            // console.log(rows);
            // console.log("listed items", rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// Random item
module.exports.randomItem = function (req, res, next) {
    const sql = `SELECT itemId from items`;
    // console.log("test");

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
    // res.send("success");
}

// Delete one item
module.exports.deleteItem = function (req, res, next) {
    console.log("executing delete");
    var sql = `DELETE FROM playerItemInventory WHERE invId = ? AND userId = ?`;
    var values = [req.params.invId, req.params.id];
    console.log("value:", values);
    // console.log("executing delete");
    // const values = 1;
    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}

// Get balance
module.exports.retrieveBal = function (req, res, next) {
    const sql = `SELECT bal FROM user WHERE userId = ?`;
    const values = [req.params.id]
    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
};

// get all balance
module.exports.retrieveAllBal = function (req, res, next) {
    const sql = `SELECT username, bal FROM user ORDER BY bal DESC LIMIT 10;`;
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
};

// Update balance
module.exports.updateBal = function (req, res, next) {
    const sql = `UPDATE user SET bal = ? WHERE userId = ?`;
    const values = [req.params.newBal, req.params.id]
    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
};

// post item listed to listed items table
module.exports.listItem = function (body, res) {
    var itemId = body.body.body[0];
    var listedBy = body.body.body[1];
    var price = body.body.body[2];

    var sql = `INSERT INTO listedItems (itemId,listedBy,price,status) VALUES (?,?,?,?)`;
    var values = [itemId, listedBy, price, 'listed'];
    console.log(values);

    connection.promise().query(sql, values)
        .then(([rows]) => {
            console.log("listed item");
            res.json(rows);
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

module.exports.deleteItemFromListedItems = function (req, res, next) {
    console.log(req.body.arr);
    var userid = req.body.arr[0];
    var listedItem = req.body.arr[1];

    var sql = `UPDATE listedItems SET status = 'sold', boughtBy = ? WHERE listedItemId = ?`;
    var values = [userid, listedItem];

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}

module.exports.takeDown = function (req, res, next) {
    var listedItem = req.params.id;
    console.log("listedItem", listedItem);

    var sql = `UPDATE listedItems SET status = 'takenDown' WHERE listedItemId = ?`;
    var values = listedItem;

    connection.promise().query(sql, values)
        .then(([rows, fields]) => {
            console.log();
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}

// get how much players earned for sales d3 bar graph
module.exports.sales = function (req, res, next) {
    var sql = `SELECT u.username, SUM(l.price) AS 'sales'
    FROM listedItems l
    JOIN user u ON l.listedBy = u.userid
    WHERE l.status = 'sold'
    GROUP BY u.username
    ORDER BY sales desc
    LIMIT 10;`

    connection.promise().query(sql)
        .then(([rows, fields]) => {
            // console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            res.send(error);
        });
}