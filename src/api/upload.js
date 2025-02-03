import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import { connectToDatabase } from '../../lib/mongodb';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Connect to MongoDB
      const { db } = await connectToDatabase();

      // Create a stream from the file buffer
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: 'portfolio' }, // Optional: Organize files in a folder
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          // Save the image URL to MongoDB
          const image = {
            text: fields.text,
            photo: result.secure_url,
          };

          try {
            await db.collection('images').insertOne(image);
            res.status(201).json(image);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
      );

      // Pipe the file buffer to Cloudinary
      streamifier.createReadStream(files.photo.path).pipe(stream);
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}