require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../src/app");
const Purchase = require("../src/models/Purchase");
const Vehicle = require("../src/models/Vehicle");

const createUserToken = () => {
    return jwt.sign(
        {
            id: new mongoose.Types.ObjectId(),
            role: "user"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
};

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI);
    }
});

afterAll(async () => {
    await Purchase.deleteMany({});

    await Vehicle.deleteMany({
        make: "HistoryTestCar"
    });

    await mongoose.connection.close();
});

describe("GET /api/purchases", () => {

    test("should get purchase history for authenticated user", async () => {

        const userId = new mongoose.Types.ObjectId();

        const token = jwt.sign(
            {
                id: userId,
                role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const vehicle = await Vehicle.create({
            make: "HistoryTestCar",
            model: "Model1",
            category: "Sedan",
            price: 25000,
            quantity: 5
        });

        await Purchase.create({
            user: userId,
            vehicle: vehicle._id,
            quantity: 2,
            totalPrice: 50000
        });

        const response = await request(app)
            .get("/api/purchases")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0]).toHaveProperty(
            "quantity",
            2
        );

        expect(response.body[0]).toHaveProperty(
            "totalPrice",
            50000
        );
    });

});


describe("GET /api/purchases/all", () => {

    test("should get all purchase history as admin", async () => {

        const adminId = new mongoose.Types.ObjectId();

        const token = jwt.sign(
            {
                id: adminId,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const vehicle = await Vehicle.create({
            make: "HistoryTestCar",
            model: "AdminModel",
            category: "SUV",
            price: 30000,
            quantity: 5
        });

        await Purchase.create({
            user: new mongoose.Types.ObjectId(),
            vehicle: vehicle._id,
            quantity: 2,
            totalPrice: 60000
        });

        const response = await request(app)
            .get("/api/purchases/all")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0]).toHaveProperty("quantity");

        expect(response.body[0]).toHaveProperty("totalPrice");
    });

});