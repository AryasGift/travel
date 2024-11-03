import Tour from '../models/Tour.js';

// Create new Tour
export const createTour = async(req,res) => {
  console.log(req.body);
  const {title,city,address,distance,desc,price,maxGroupSize} = req.body;
  const photo=req.file?.filename
  try {
    const newTour = new Tour({
      title,
      city,
      address,
      distance,
      desc,
      price,
      maxGroupSize,
      photo,
    });

    const savedTour = await newTour.save();
    res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create', error: err.message });
  }
};

// Update Tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update' });
  }
};

// Delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete' });
  }
};

// Get Single Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const singleTour = await Tour.findById(id).populate('reviews');
    res.status(200).json({ success: true, message: 'Successfully found', data: singleTour });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Tour not found' });
  }
};

// Get All Tours
export const getAllTour = async (req, res) => {
  try {
    const tours = await Tour.find({}).populate('reviews');
    res.status(200).json({ success: true, count: tours.length, message: 'All data', data: tours });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Tours not found' });
  }
};

// Search Tours
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, 'i');
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);
  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate('reviews');
    res.status(200).json({ success: true, message: 'Successfully found', data: tours });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Tours not found' });
  }
};

// Get Featured Tours
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
    res.status(200).json({ success: true, count: tours.length, message: 'Featured tours', data: tours });
  } catch (err) {
    res.status(404).json({ success: false, message: 'Featured tours not found' });
  }
};

// Get Tour Count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch tour count' });
  }
};
