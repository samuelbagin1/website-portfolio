import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Fetch all images from the database
      const images = await db.collection('images').find({}).toArray();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}