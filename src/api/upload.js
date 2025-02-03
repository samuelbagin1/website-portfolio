// src/api/upload.js
import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Create a stream from the file buffer
      const stream = cloudinary.v2.uploader.upload_stream(
        { folder: 'portfolio' }, // Optional: Organize files in a folder
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          // Save the image URL to MongoDB
          const image = new Image({
            text: fields.text,
            photo: result.secure_url,
          });

          image.save()
            .then(() => res.status(201).json(image))
            .catch((err) => res.status(500).json({ error: err.message }));
        }
      );

      // Pipe the file buffer to Cloudinary
      streamifier.createReadStream(files.photo.path).pipe(stream);
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}