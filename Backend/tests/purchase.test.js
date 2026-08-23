require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../src/app");

const Vehicle = require("../src/models/Vehicle");
const Purchase = require("../src/models/Purchase");

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

afterEach(async () => {
    await Purchase.deleteMany({});
    await Vehicle.deleteMany({
        make: {
            $in: ["Toyota", "Honda"]
        }
    });
});

afterAll(async () => {
    await Purchase.deleteMany({});
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
            make: "Toyota",
            model: "Camry",
            category: "Sedan",
            price: 30000,
            quantity: 5
        });

        await Purchase.create({
            user: userId,
            vehicle: vehicle._id,
            quantity: 2,
            totalPrice: 60000
        });

        const response = await request(app)
            .get("/api/purchases")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBe(1);

        expect(response.body[0]).toHaveProperty(
            "quantity",
            2
        );

        expect(response.body[0]).toHaveProperty(
            "totalPrice",
            60000
        );
    });

});


describe("GET /api/purchases/all", () => {

    test("should allow admin to get all purchases", async () => {

        const userId = new mongoose.Types.ObjectId();

        const userToken = jwt.sign(
            {
                id: userId,
                role: "user"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const adminToken = createAdminToken();

        const vehicle = await Vehicle.create({
            make: "Honda",
            model: "Civic",
            category: "Sedan",
            price: 25000,
            quantity: 5
        });

        await Purchase.create({
            user: userId,
            vehicle: vehicle._id,
            quantity: 1,
            totalPrice: 25000
        });

        const response = await request(app)
            .get("/api/purchases/all")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

        expect(response.body.length).toBe(1);

        expect(response.body[0]).toHaveProperty(
            "quantity",
            1
        );

        expect(response.body[0]).toHaveProperty(
            "totalPrice",
            25000
        );
    });

});


describe("GET /api/purchases/all - Authorization", () => {

    test("should not allow normal user to get all purchases", async () => {

        const token = createUserToken();

        const response = await request(app)
            .get("/api/purchases/all")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(403);
    });

});