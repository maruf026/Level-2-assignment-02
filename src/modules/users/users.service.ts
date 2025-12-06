import { pool } from "../../config/db";
import bcrypt from "bcryptjs";





const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};


const updateUser =async(payload: Record<string, unknown>, id: string)=>{
   const {name, email, phone, role} = payload;
   const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, phone=$3, role=$4  WHERE id=$5 RETURNING *`,
      [name, email, phone, role, id]
    );

    return result
}

const deleteUser = async (id: string) => {
  const activeBooking = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1 AND status = 'active'`,
    [id]
  );

  if (activeBooking.rows.length > 0) {
    throw new Error("User cannot be deleted because they have active bookings");
  }

  return await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
};


export const userService = {
 
  getUsers,
  updateUser,
  deleteUser
};
