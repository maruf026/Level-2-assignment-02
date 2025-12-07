"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const users_route_1 = require("./modules/users/users.route");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const bookings_routes_1 = require("./modules/bookings/bookings.routes");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("Vehicle Rental System API is running successfully");
});
////auth 
app.use("/api/v1/auth/", auth_routes_1.authRouter);
//Vehicle 
app.use("/api/v1/vehicles/", vehicles_routes_1.vehicleRouter);
//Users
app.use("/api/v1/users/", users_route_1.userRoute);
/// Bookings
app.use("/api/v1/bookings/", bookings_routes_1.bookingRouter);
//not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Path not found",
        errors: "Route does not exist",
    });
});
exports.default = app;
