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
        make: {
            $in: ["Toyota", "Honda", "Ford", "BMW"]
        }
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

        const token = createUserToken();

        const response = await request(app)
            .get("/api/vehicles")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });


    test("should filter vehicles by model", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "Camry",
                category: "Sedan",
                price: 30000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 25000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?model=Camry")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(vehicle => {
            expect(vehicle.model).toBe("Camry");
        });

        await Vehicle.deleteMany({
            model: {
                $in: ["Camry", "Civic"]
            }
        });
    });


    test("should filter vehicles by category", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "RAV4",
                category: "SUV",
                price: 35000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 25000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?category=SUV")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(vehicle => {
            expect(vehicle.category).toBe("SUV");
        });

        await Vehicle.deleteMany({
            category: {
                $in: ["SUV", "Sedan"]
            }
        });
    });


    test("should filter vehicles by make", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 25000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 24000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?make=Toyota")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(vehicle => {
            expect(vehicle.make).toBe("Toyota");
        });

        await Vehicle.deleteMany({
            make: {
                $in: ["Toyota", "Honda"]
            }
        });
    });


    test("should filter vehicles by minimum price", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 25000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 15000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?minPrice=20000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        response.body.forEach(vehicle => {
            expect(vehicle.price).toBeGreaterThanOrEqual(20000);
        });

        await Vehicle.deleteMany({
            model: {
                $in: ["Corolla", "Civic"]
            }
        });
    });


    test("should filter vehicles by maximum price", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 25000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "Civic",
                category: "Sedan",
                price: 15000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?maxPrice=20000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        response.body.forEach(vehicle => {
            expect(vehicle.price).toBeLessThanOrEqual(20000);
        });

        await Vehicle.deleteMany({
            model: {
                $in: ["Corolla", "Civic"]
            }
        });
    });


    test("should filter vehicles using multiple filters", async () => {

        const token = createUserToken();

        await Vehicle.create([
            {
                make: "Toyota",
                model: "RAV4",
                category: "SUV",
                price: 35000,
                quantity: 5
            },
            {
                make: "Toyota",
                model: "Corolla",
                category: "Sedan",
                price: 25000,
                quantity: 5
            },
            {
                make: "Honda",
                model: "CRV",
                category: "SUV",
                price: 30000,
                quantity: 4
            }
        ]);

        const response = await request(app)
            .get("/api/vehicles?make=Toyota&category=SUV&minPrice=30000&maxPrice=40000")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

        response.body.forEach(vehicle => {
            expect(vehicle.make).toBe("Toyota");
            expect(vehicle.category).toBe("SUV");
            expect(vehicle.price).toBeGreaterThanOrEqual(30000);
            expect(vehicle.price).toBeLessThanOrEqual(40000);
        });

        await Vehicle.deleteMany({
            model: {
                $in: ["RAV4", "Corolla", "CRV"]
            }
        });
    });

});


describe("GET /api/vehicles/:id", () => {

    test("should get a vehicle by ID", async () => {

        const token = createUserToken();

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


describe("PUT /api/vehicles/:id", () => {

    test("should update a vehicle as admin", async () => {

        const token = createAdminToken();

        const vehicle = await Vehicle.create({
            make: "Ford",
            model: "Focus",
            category: "Hatchback",
            price: 22000,
            quantity: 2
        });

        const response = await request(app)
            .put(`/api/vehicles/${vehicle._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Ford",
                model: "Mustang",
                category: "Sports",
                price: 35000,
                quantity: 4
            });

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty("make", "Ford");
        expect(response.body).toHaveProperty("model", "Mustang");
        expect(response.body).toHaveProperty("category", "Sports");
        expect(response.body).toHaveProperty("price", 35000);
        expect(response.body).toHaveProperty("quantity", 4);

        await Vehicle.findByIdAndDelete(vehicle._id);
    });

});


describe("DELETE /api/vehicles/:id", () => {

    test("should delete a vehicle as admin", async () => {

        const token = createAdminToken();

        const vehicle = await Vehicle.create({
            make: "BMW",
            model: "X5",
            category: "SUV",
            price: 60000,
            quantity: 2
        });

        const response = await request(app)
            .delete(`/api/vehicles/${vehicle._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty(
            "message",
            "Vehicle deleted successfully"
        );

        const deletedVehicle = await Vehicle.findById(vehicle._id);

        expect(deletedVehicle).toBeNull();
    });

});