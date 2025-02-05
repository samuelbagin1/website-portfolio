import { connectToDatabase } from '../lib/mongodb';

export const config = {
  maxDuration: 15,
};

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const images = await db.collection('images').find({}).toArray();
      res.status(200).json(images);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};