const express = require("express");

const router = express.Router();

const {
    getPurchaseHistory,
    getAllPurchases
} = require("../controllers/purchaseController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// GET /api/purchases
// Normal user purchase history
router.get(
    "/",
    authMiddleware,
    getPurchaseHistory
);


// GET /api/purchases/all
// Admin only - all purchase history
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllPurchases
);


module.exports = router;