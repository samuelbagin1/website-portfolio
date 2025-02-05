import { connectToDatabase } from '../lib/mongodb';

export const config = { maxDuration: 15 }; // Extend timeout

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      
      // Get pagination parameters from query
      const page = parseInt(req.query.page) || 1; // Default: page 1
      const limit = parseInt(req.query.limit) || 1; // Load 1 image per request
      const skip = (page - 1) * limit;

      // Fetch images with pagination
      const images = await db.collection('images')
        .find({})
        .skip(skip)
        .limit(limit)
        .toArray();

      // Get total number of images (for calculating total pages)
      const totalImages = await db.collection('images').countDocuments();
      const totalPages = Math.ceil(totalImages / limit);

      res.status(200).json({ images, totalPages, currentPage: page });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};