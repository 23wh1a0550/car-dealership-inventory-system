const express = require("express");

const router = express.Router();

const {
    purchaseVehicle
} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
    "/:id/purchase",
    authMiddleware,
    purchaseVehicle
);

module.exports = router;