const Vehicle = require("../models/Vehicle");

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({
      createdAt: -1,
    });

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch vehicles",
    });
  }
};

// Add vehicle
const createVehicle = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      color,
      status,
    } = req.body;

    if (
      !brand ||
      !model ||
      !year ||
      !price ||
      !fuelType ||
      !transmission ||
      !color
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const vehicle = await Vehicle.create({
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      color,
      status: status || "Available",
    });

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add vehicle",
    });
  }
};

// Delete vehicle
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(
      req.params.id
    );

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete vehicle",
    });
  }
};

module.exports = {
  getVehicles,
  createVehicle,
  deleteVehicle,
};