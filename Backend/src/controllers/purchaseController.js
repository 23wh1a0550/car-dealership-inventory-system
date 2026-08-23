const Purchase = require("../models/Purchase");

// Get purchase history for logged-in user
const getPurchaseHistory = async (req, res) => {
    try {
        const { vehicleId } = req.query;

        const filter = {
            user: req.user.id
        };

        // Filter by vehicle if vehicleId is provided
        if (vehicleId) {
            filter.vehicle = vehicleId;
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


// Get all purchase history - Admin only
const getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate("user")
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


module.exports = {
    getPurchaseHistory,
    getAllPurchases
};