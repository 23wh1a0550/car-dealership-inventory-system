require("dotenv").config();

const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const authMiddleware = require("../src/middleware/authMiddleware");

const app = express();

app.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "Access granted",
        user: req.user
    });
});

describe("Authentication Middleware", () => {

    test("should reject request without token", async () => {

        const response = await request(app)
            .get("/protected");

        expect(response.statusCode).toBe(401);

    });


    test("should reject invalid token", async () => {

        const response = await request(app)
            .get("/protected")
            .set("Authorization", "Bearer invalidtoken");

        expect(response.statusCode).toBe(401);

    });


    test("should allow request with valid token", async () => {

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
            .get("/protected")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Access granted");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.role).toBe("user");

    });

});