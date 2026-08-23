const Vehicle = require("../models/Vehicle");
const Purchase = require("../models/Purchase");

const purchaseVehicle = async (req, res) => {
    try {
        const { quantity } = req.body;

        const vehicle = await Vehicle.findById(req.params.id);

        // Vehicle not found
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        // Vehicle has no stock
        if (vehicle.quantity === 0) {
            return res.status(400).json({
                message: "Vehicle unavailable"
            });
        }

        // Invalid or insufficient quantity
        if (
            !quantity ||
            quantity <= 0 ||
            quantity > vehicle.quantity
        ) {
            return res.status(400).json({
                message: "Insufficient vehicle quantity"
            });
        }

        // Calculate total price
        const totalPrice = vehicle.price * quantity;

        // Decrease vehicle quantity
        vehicle.quantity -= quantity;

        await vehicle.save();

        // Create purchase history
        const purchase = await Purchase.create({
            user: req.user.id,
            vehicle: vehicle._id,
            quantity: quantity,
            totalPrice: totalPrice
        });

        return res.status(200).json({
            message: "Vehicle purchased successfully",
            quantity: vehicle.quantity,
            quantityPurchased: quantity,
            totalPrice: totalPrice,
            vehicle: vehicle,
            purchase: purchase
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getPurchaseHistory = async (req, res) => {
    try {
        const filter = {
            user: req.user.id
        };

        // Filter by vehicle
        if (req.query.vehicleId) {
            filter.vehicle = req.query.vehicleId;
        }

        const purchases = await Purchase.find(filter)
            .populate("vehicle")
            .sort({ createdAt: -1 });

        return res.status(200).json(purchases);

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("vehicle")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.status(200).json(purchases);

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    purchaseVehicle,
    getPurchaseHistory,
    getAllPurchases
};