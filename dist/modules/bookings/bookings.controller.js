"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const db_1 = require("../../config/db");
const bookings_service_1 = require("./bookings.service");
const createBooking = async (req, res) => {
    try {
        const payload = { ...req.body };
        if (req.user?.role === "customer") {
            payload.customer_id = req.user.id;
        }
        const result = await bookings_service_1.bookingService.createBooking(payload);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message,
        });
    }
};
const getAllBooking = async (req, res) => {
    try {
        const result = await bookings_service_1.bookingService.getAllBooking(req.user);
        const message = req.user?.role === "admin"
            ? "Bookings retrieved successfully"
            : "Your bookings retrieved successfully";
        res.status(200).json({
            success: true,
            message,
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { status } = req.body;
        const existing = await db_1.pool.query(`SELECT * FROM bookings WHERE id = $1`, [
            bookingId,
        ]);
        if (existing.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
                errors: "Booking not found",
            });
        }
        const booking = existing.rows[0];
        if (req.user?.role === "customer") {
            if (booking.customer_id !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                    errors: "You can cancel only your own booking",
                });
            }
            if (status !== "cancelled") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status",
                    errors: "Customers can only cancel bookings",
                });
            }
        }
        if (req.user?.role === "admin" && status !== "returned") {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
                errors: 'Admin can only mark booking as "returned"',
            });
        }
        const result = await bookings_service_1.bookingService.updateBooking(status, bookingId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
                errors: "Booking not found",
            });
        }
        const message = status === "cancelled"
            ? "Booking cancelled successfully"
            : "Booking marked as returned. Vehicle is now available";
        res.status(200).json({
            success: true,
            message,
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBooking,
    updateBooking,
};
