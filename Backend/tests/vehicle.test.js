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
describe("GET /api/vehicles", () => {

    test("should get all vehicles as an authenticated user", async () => {

        const token = jwt.sign(
            {
                id: new mongoose.Types.ObjectId(),
                role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const response = await request(app)
            .get("/api/vehicles")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

    });

});
describe("GET /api/vehicles/:id", () => {

    test("should get a vehicle by ID", async () => {

        const token = jwt.sign(
            {
                id: new mongoose.Types.ObjectId(),
                role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Create a vehicle first
        const vehicle = await Vehicle.create({
            make: "Honda",
            model: "Civic",
            category: "Sedan",
            price: 25000,
            quantity: 3
        });

        const response = await request(app)
            .get(`/api/vehicles/${vehicle._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("make", "Honda");
        expect(response.body).toHaveProperty("model", "Civic");
        expect(response.body).toHaveProperty("category", "Sedan");

        await Vehicle.findByIdAndDelete(vehicle._id);
    });

});