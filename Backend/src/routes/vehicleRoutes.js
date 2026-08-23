const express = require("express");

const {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle
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

router.get(
    "/:id",
    authMiddleware,
    getVehicleById
);
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateVehicle
);

module.exports = router;