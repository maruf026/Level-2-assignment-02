"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signupUser = async (req, res) => {
    try {
        const result = await auth_service_1.authService.signupUser(req.body);
        const user = result.rows[0];
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authService.loginUser(email, password);
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                errors: "Invalid email or password",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.authController = {
    signupUser,
    loginUser,
};
