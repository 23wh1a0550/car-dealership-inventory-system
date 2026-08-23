const express = require("express");

const {
  getVehicles,
  createVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

router.get("/", getVehicles);

router.post("/", createVehicle);

router.delete("/:id", deleteVehicle);

module.exports = router;