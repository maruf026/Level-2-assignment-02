import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();


router.get("/",auth('admin'), userController.getUsers);
router.put("/:userId", auth("admin", "customer"), userController.updateUser );
router.delete("/:userId", auth("admin"), userController.deleteUser)


export const userRoute = router;