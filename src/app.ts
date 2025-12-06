import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";

import { authRouter } from "./modules/auth/auth.routes";
import { userRoute } from "./modules/users/users.route";
import { vehicleRouter } from "./modules/vehicles/vehicles.routes";
import { bookingRouter } from "./modules/bookings/bookings.routes";
const app = express();


//parser
app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developer!");
});

////auth 
app.use("/api/v1/auth/", authRouter);


//Vehicle 
app.use("/api/v1/vehicles/", vehicleRouter)

//Users
app.use("/api/v1/users/", userRoute);

/// Bookings
app.use("/api/v1/bookings/", bookingRouter);


//not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Path not found",
    errors: "Route does not exist",
  });
});

export default app;
