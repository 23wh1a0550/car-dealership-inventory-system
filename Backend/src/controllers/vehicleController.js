const Vehicle = require("../models/Vehicle");

const createVehicle = async (req, res) => {
    try {
        const { make, model, category, price, quantity } = req.body;

        if (!make || !model || !category || price === undefined || quantity === undefined) {
            return res.status(400).json({
                message: "All vehicle fields are required"
            });
        }

        const vehicle = await Vehicle.create({
            make,
            model,
            category,
            price,
            quantity
        });

        res.status(201).json(vehicle);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createVehicle
};