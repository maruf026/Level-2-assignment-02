
import  bcrypt  from 'bcryptjs';
import { pool } from "../../config/db"
import jwt from "jsonwebtoken"
import config from '../../config';


const signupUser = async (payload: Record<string, unknown>) => {
  const {
    name,
    email,
    password,
    phone,
    role
  } = payload;

  const hashedPass =await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
          INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
          `,
    [
      name, email, hashedPass, phone, role
    ]
  );

  return result;
};


const loginUser =async(email: string, password: string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE email= $1`, [email]);

    if(result.rows.length === 0){
        return null;
    }
    const user = result.rows[0];
    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched){
        return null
    }

    const JwtPayload ={
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    }
    const token = jwt.sign(JwtPayload, config.jwtSecret as string, {expiresIn: "7d"});

      const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

    console.log({token});
    return {token, user: safeUser};

  
}

export const authService = {
    signupUser,
    loginUser
  }