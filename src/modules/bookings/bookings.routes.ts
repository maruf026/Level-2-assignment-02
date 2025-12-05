import { Router } from "express";
import { bookingController } from "./bookings.controller";

const router = Router();

router.post("/", bookingController.createBooking);

export const bookingRouter = router;