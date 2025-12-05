import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";
import { pool } from "../../config/db";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicle(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicles = async(req:Request, res: Response)=>{
    try{
        const result = await vehicleService.getAllVehicles();

         res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows
     })
    }catch(err: any){
         res.status(500).json({
      success: false,
      message: err.message,
    });
    }
}

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicle(req.params.vehicleId!);

    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result.rows
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const updateVehicle = async (req: Request, res: Response) => {
  
  try {
     const result = await vehicleService.updateVehicle(req.body, req.params.vehicleId!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not updated",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
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


const deleteVehicle = async (req: Request, res: Response) => {
  try {
       const result = await vehicleService.deleteVehicle(req.params.vehicleId!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
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








export const vehicleController = {
  createVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle
};
