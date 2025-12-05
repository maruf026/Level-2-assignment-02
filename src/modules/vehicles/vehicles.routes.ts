import { Router } from "express";
import { vehicleController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin"), vehicleController.createVehicle);
router.get("/", vehicleController.getAllVehicles);
router.get("/:vehicleId",auth("admin"), vehicleController.getVehicle);
router.put("/:vehicleId", vehicleController.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleController.deleteVehicle)


export const vehicleRouter = router;