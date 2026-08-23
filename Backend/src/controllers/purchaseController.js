const Purchase = require("../models/Purchase");


// Get purchase history of logged-in user
const getMyPurchases = async (req, res) => {

    try {

        const purchases = await Purchase.find({
            user: req.user.id
        })
            .populate("vehicle")
            .sort({ createdAt: -1 });

        res.status(200).json(purchases);

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


// Admin gets all purchases
const getAllPurchases = async (req, res) => {

    try {

        const purchases = await Purchase.find()
            .populate("user", "-password")
            .populate("vehicle")
            .sort({ createdAt: -1 });

        res.status(200).json(purchases);

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    getMyPurchases,
    getAllPurchases
};