"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_service_1 = require("./users.service");
const getUsers = async (req, res) => {
    try {
        const result = await users_service_1.userService.getUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { role } = req.body;
        // Customer cannot update others
        if (req.user?.role === "customer" && req.user?.id !== Number(userId)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
                errors: "Customers can only update their own profile",
            });
        }
        // Customer cannot change own role
        if (req.user?.role === "customer" && role) {
            return res.status(400).json({
                success: false,
                message: "Invalid update",
                errors: "Customers are not allowed to change role",
            });
        }
        const result = await users_service_1.userService.updateUser(req.body, userId);
        if (!result || result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
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
const deleteUser = async (req, res) => {
    try {
        const result = await users_service_1.userService.deleteUser(req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null,
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
exports.userController = {
    getUsers,
    updateUser,
    deleteUser
};
