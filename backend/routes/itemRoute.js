const express = require("express");
const router = express.Router();
const cors = require('cors');

router.use(cors());
router.use(express.json());

const itemController = require("../controllers/itemShopController");

// Gacha Item
router.post("/gachaItem/:id/:itemId", itemController.gachaItem);
// List Item
router.post("/listitem", itemController.listItem);
// get itemId from invId
router.get("/getitemid", itemController.getItemId);
// Add qty to existing item (for gacha item)
router.put("/addqty", itemController.addQty);
// Check item
router.get("/checkitem", itemController.checkItem);
// Check qty
router.get("/checkqty", itemController.checkQty);
// Update qty (for list item in inventory)
router.put("/updateqty", itemController.updateQty);
// Random item
router.get("/randomItem", itemController.randomItem);
// Retrieve all item
router.get("/retrieveItem/:id", itemController.getAllItem);
// Delete one item
router.delete("/deleteItem/:id/:invId", itemController.deleteItem);
// Retrieve balance
router.get("/getBal/:id", itemController.retrieveBal);
// Update balance
router.put("/updatebal/:id/:newBal", itemController.updateBal);
// Get image
router.get("/getimage/:id", itemController.getImage);
// Get item name
router.get("/getName/:id", itemController.getName);
// get all listed items 
router.get("/getlisteditems", itemController.getListedItems);
// delete item from the listed items table when user buys an item
router.put("/deletefromlisteditems", itemController.deleteItemFromListedItems);
// cancel listed item and item will return to the user's item inventory
router.put("/takedown/:id", itemController.takeDown);
// get all balance
router.get("/allbal", itemController.retrieveAllBal);
// get sales
router.get("/sales", itemController.sales);

module.exports = router;