// routes/bookingRoutes.js
import express from 'express';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { createBooking, deleteBooking, getAllBooking, getBooking, getBookingsByUserId } from '../controllers/bookingController.js';

const router = express.Router();
router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBooking);
router.get('/', verifyToken, getAllBooking);
router.get('/user/:userId', verifyUser, getBookingsByUserId); // New route for fetching bookings by user ID
router.delete('/:id',verifyUser, deleteBooking);
export default router;
