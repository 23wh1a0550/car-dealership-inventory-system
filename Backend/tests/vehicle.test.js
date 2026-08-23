require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

const Vehicle = require("../src/models/Vehicle");

const createAdminToken = () => {
    return jwt.sign(
        {
            id: new mongoose.Types.ObjectId(),
            role: "admin"
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
    await Vehicle.deleteMany({
        make: "Toyota"
    });

    await mongoose.connection.close();
});

describe("POST /api/vehicles", () => {

    test("should create a vehicle as admin", async () => {

        const token = createAdminToken();

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Camry",
                category: "Sedan",
                price: 30000,
                quantity: 5
            });

        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("make", "Toyota");
        expect(response.body).toHaveProperty("model", "Camry");
        expect(response.body).toHaveProperty("category", "Sedan");
        expect(response.body).toHaveProperty("price", 30000);
        expect(response.body).toHaveProperty("quantity", 5);

    });

});