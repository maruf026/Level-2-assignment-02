import { Request, Response } from "express";
import { authService } from "./auth.service";


const signupUser = async(req:Request, res:Response)=>{
  try{
       const result = await authService.signupUser(req.body)
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: result.rows,
    });
  }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    // console.log(result.rows[0]);
     if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        errors: "Invalid email or password",
      });
    };
    
    res.status(200).json({
      success: true,
      message: "login successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signupUser,
  loginUser,
};