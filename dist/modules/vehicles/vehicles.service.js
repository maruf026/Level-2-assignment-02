"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`
          INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
          `, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result;
};
const getAllVehicles = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
};
const getVehicle = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
};
const updateVehicle = async (payload, id) => {
    const fields = Object.keys(payload);
    const values = Object.values(payload);
    if (fields.length === 0)
        return null;
    const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(", ");
    const result = await db_1.pool.query(`UPDATE vehicles SET ${setQuery} WHERE id = $${fields.length + 1} RETURNING *`, [...values, id]);
    return result;
};
const deleteVehicle = async (id) => {
    const activeBooking = await db_1.pool.query(`SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'`, [id]);
    if (activeBooking.rows.length > 0) {
        throw new Error("Vehicle cannot be deleted because it has active bookings");
    }
    return await db_1.pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
};
exports.vehicleService = {
    createVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
};
