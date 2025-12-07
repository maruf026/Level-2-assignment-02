"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicles_service_1 = require("./vehicles.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.createVehicle(req.body);
        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.getAllVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.getVehicle(req.params.vehicleId);
        return res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.vehicleId;
        const result = await vehicles_service_1.vehicleService.updateVehicle(req.body, vehicleId);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "No valid fields to update",
            });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehicleService.deleteVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.vehicleController = {
    createVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
};
