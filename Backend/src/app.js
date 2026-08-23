const express = require("express");

const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/vehicles", inventoryRoutes);

app.use("/api/purchases", purchaseRoutes);

module.exports = app;