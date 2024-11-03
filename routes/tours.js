import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'
import upload from '../middlewares/multerMiddleware.js'

const router=express.Router()
router.post('/createTour',verifyToken,upload.single('photo'),createTour);
router.put('/:id',verifyAdmin,updateTour)
router.delete('/:id',verifyToken,deleteTour)
router.get('/:id',getSingleTour)
router.get('/',getAllTour)
router.get('/search/getTourBySearch',getTourBySearch)
router.get('/search/getFeaturedTours',getFeaturedTour)
router.get('/search/getTourCount',getTourCount)
export default router