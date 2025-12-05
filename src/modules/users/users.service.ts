import { pool } from "../../config/db";
import bcrypt from "bcryptjs";





const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};


const updateUser =async(payload: Record<string, unknown>, id: string)=>{
   const {name, email, phone, role} = payload;
   const result = await pool.query(
      `UPDATE users SET name=$1, email=$2, phone=$4, role=$5  WHERE id=$6 RETURNING *`,
      [name, email, phone, role, id]
    );

    return result
}

const deleteUser =async(id: string)=>{
   const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      id
    ]);

    return result
}

export const userService = {
 
  getUsers,
  updateUser,
  deleteUser
};
