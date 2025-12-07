"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const getUsers = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const updateUser = async (payload, id) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4  WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    return result;
};
const deleteUser = async (id) => {
    const activeBooking = await db_1.pool.query(`SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'`, [id]);
    if (activeBooking.rows.length > 0) {
        throw new Error("User cannot be deleted because they have active bookings");
    }
    return await db_1.pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
};
exports.userService = {
    getUsers,
    updateUser,
    deleteUser
};
