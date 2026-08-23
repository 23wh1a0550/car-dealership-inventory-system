const request = require("supertest");
const app = require("../src/app");

describe("POST /api/auth/register", () => {
    test("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "Password123"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");
    });
});