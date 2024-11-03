import Booking from "../models/Booking.js"
export const createBooking=async(req,res)=>{
    console.log(req);
    const newBooking=new Booking(req.body)
    try{
       
       const savedBooking=await newBooking.save()
       res.status(200).json({success:true,message:'Your tour is booked',data:savedBooking})
    }
    catch(err){
        res.status(500).json({success:false,message:'Your tour booking failed'})

    }
}
export const getBooking=async(req,res)=>{
    const id=req.params.id;
    try{
        const book=await Booking.findById(id)
        res.status(200).json({success:true,message:'Successfull',data:book})

    }
    catch{
        res.status(500).json({success:false,message:'failed'})
 
    }
}
export const getAllBooking=async(req,res)=>{
    try{
        const books=await Booking.find()
        res.status(200).json({success:true,message:'Successfull',data:books})

    }
    catch{
        res.staus(500).json({success:false,message:'failed'})
 
    }
}
// controllers/bookingController.js

export const getBookingsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const bookings = await Booking.find({ userId });
        if (!bookings) {
            return res.status(404).json({ success: false, message: 'No bookings found for this user' });
        }
        res.status(200).json({ success: true, message: 'Successful', data: bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: err.message });
    }
};
export const deleteBooking = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete booking', error: err.message });
    }
};
