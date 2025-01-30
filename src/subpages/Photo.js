import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageUploadForm from '../components/ImageUploadForm';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

const API_URL = 'http://localhost:5001';

function Photo() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/images`);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <body className='bg-[#111111] min-h-screen'>
        <Navbar />

        <div className='h-[100px]'></div>

        {/* Pass fetchImages as a callback */}
        <div className="container mx-auto px-4">
          <ImageUploadForm onUploadSuccess={fetchImages} />
        </div>

        <div className='relative'>
          {images.map((image) => (
            <div key={image._id}>
              <AsyncImage
                alt={image.text}
                src={image.photo}
                style={{ height: 'auto', aspectRatio: 1 / 1 }}
                loader={<div style={{ background: '#888' }} />}
                error={<div style={{ background: '#eee' }} />}
                Transition={(props) => <Blur radius={10} {...props} />}
                className='w-3/4 rounded-xl mx-auto my-10'
              />
            </div>
          ))}
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Photo;