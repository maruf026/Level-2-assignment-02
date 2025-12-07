"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const signupUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    // 🔥 Check duplicate email
    const exists = await db_1.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (exists.rows.length > 0) {
        throw new Error("Email already registered");
    }
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
      INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
    `, [name, email, hashedPass, phone, role]);
    return result;
};
const loginUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email= $1`, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const isMatched = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatched) {
        return null;
    }
    const JwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    };
    const token = jsonwebtoken_1.default.sign(JwtPayload, config_1.default.jwtSecret, { expiresIn: "7d" });
    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
    return { token, user: safeUser };
};
exports.authService = {
    signupUser,
    loginUser,
};
