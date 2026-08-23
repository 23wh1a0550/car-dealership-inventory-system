const Vehicle = require("../models/Vehicle");

const purchaseVehicle = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Purchase quantity must be greater than zero"
            });
        }

        const vehicle = await Vehicle.findById(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        if (vehicle.quantity === 0) {
            return res.status(400).json({
                message: "Vehicle unavailable"
            });
        }

        if (vehicle.quantity < quantity) {
            return res.status(400).json({
                message: "Insufficient vehicle quantity"
            });
        }

        vehicle.quantity -= quantity;

        await vehicle.save();

        res.status(200).json({
            message: "Vehicle purchased successfully",
            quantity: vehicle.quantity
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    purchaseVehicle
};