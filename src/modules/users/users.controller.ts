import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./users.service";





const getUsers = async(req: Request, res: Response)=>{
  try{
     const result =await userService.getUsers();
     res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows
     })
  }catch(error: any){
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const updateUser = async (req: Request, res: Response) => {
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

    const result = await userService.updateUser(req.body, userId!);

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

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



const deleteUser = async (req: Request, res: Response) => {
  try {
       const result = await userService.deleteUser(req.params.userId!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
   
    getUsers,
    updateUser,
    deleteUser
}