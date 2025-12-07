"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                    errors: "Missing or invalid authentication token",
                });
            }
            const token = authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                    errors: "Missing authentication token",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            if (!decoded || !decoded.role) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                    errors: "Invalid user token",
                });
            }
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                    errors: "You are unauthorized!",
                });
            }
            next();
        }
        catch (err) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                errors: "Invalid or expired token",
            });
        }
    };
};
exports.default = auth;
