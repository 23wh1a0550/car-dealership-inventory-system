const express = require("express");

const {
    createVehicle,
    getVehicles
} = require("../controllers/vehicleController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createVehicle
);

router.get(
    "/",
    authMiddleware,
    getVehicles
);

module.exports = router;