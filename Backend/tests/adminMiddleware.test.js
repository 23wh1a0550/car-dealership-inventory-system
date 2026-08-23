require("dotenv").config();

const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");

const authMiddleware = require("../src/middleware/authMiddleware");
const adminMiddleware = require("../src/middleware/adminMiddleware");

const app = express();

app.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.status(200).json({
            message: "Admin access granted"
        });
    }
);

describe("Admin Middleware", () => {

    test("should allow admin user", async () => {

        const token = jwt.sign(
            {
                id: new mongoose.Types.ObjectId(),
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        const response = await request(app)
            .get("/admin")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Admin access granted");

    });


    test("should reject normal user", async () => {

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
            .get("/admin")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(403);

    });


    test("should reject unauthenticated request", async () => {

        const response = await request(app)
            .get("/admin");

        expect(response.statusCode).toBe(401);

    });

});