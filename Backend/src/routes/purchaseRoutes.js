const express = require("express");

const router = express.Router();

const {
    getMyPurchases,
    getAllPurchases
} = require("../controllers/purchaseController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Logged-in user's purchase history
router.get(
    "/",
    authMiddleware,
    getMyPurchases
);


// Admin purchase history
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllPurchases
);


module.exports = router;