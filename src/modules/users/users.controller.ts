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
     const result = await userService.updateUser(req.body, req.params.userId!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not updated",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


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