require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

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
    await Vehicle.deleteMany({
        make: "TestCar"
    });

    await mongoose.connection.close();
});


describe("POST /api/vehicles/:id/purchase", () => {

    test("should purchase a vehicle and decrease quantity", async () => {

        const token = createUserToken();

        const vehicle = await Vehicle.create({
            make: "TestCar",
            model: "Model1",
            category: "Sedan",
            price: 25000,
            quantity: 5
        });

        const response = await request(app)
            .post(`/api/vehicles/${vehicle._id}/purchase`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 2
            });

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty(
            "message",
            "Vehicle purchased successfully"
        );

        expect(response.body).toHaveProperty("quantity", 3);

        const updatedVehicle = await Vehicle.findById(vehicle._id);

        expect(updatedVehicle.quantity).toBe(3);

        await Vehicle.findByIdAndDelete(vehicle._id);
    });


    test("should not allow purchase when quantity is insufficient", async () => {

        const token = createUserToken();

        const vehicle = await Vehicle.create({
            make: "TestCar",
            model: "Model2",
            category: "SUV",
            price: 30000,
            quantity: 2
        });

        const response = await request(app)
            .post(`/api/vehicles/${vehicle._id}/purchase`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 5
            });

        expect(response.statusCode).toBe(400);

        expect(response.body).toHaveProperty(
            "message",
            "Insufficient vehicle quantity"
        );

        const unchangedVehicle = await Vehicle.findById(vehicle._id);

        expect(unchangedVehicle.quantity).toBe(2);

        await Vehicle.findByIdAndDelete(vehicle._id);
    });


    test("should not allow purchase when vehicle quantity is zero", async () => {

        const token = createUserToken();

        const vehicle = await Vehicle.create({
            make: "TestCar",
            model: "Model3",
            category: "Hatchback",
            price: 20000,
            quantity: 0
        });

        const response = await request(app)
            .post(`/api/vehicles/${vehicle._id}/purchase`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 1
            });

        expect(response.statusCode).toBe(400);

        expect(response.body).toHaveProperty(
            "message",
            "Vehicle unavailable"
        );

        await Vehicle.findByIdAndDelete(vehicle._id);
    });

});