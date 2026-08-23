require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const User = require("../src/models/User");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await User.deleteMany({
        email: "test@example.com"
    });

    await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {

    test("should register a new user", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
    });


    test("should not register a user with an existing email", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Another User",
                email: "test@example.com",
                password: "password123"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });

});


describe("POST /api/auth/login", () => {

    test("should login an existing user", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "password123"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
    });

});