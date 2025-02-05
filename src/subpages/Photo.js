import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Blur } from 'transitions-kit';
import { AsyncImage } from 'loadable-image';

const API_URL = 'https://head.samuelbagin.xyz/api';

function Photo() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/images?page=${page}&limit=1`);
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const { images: newImages, totalPages, currentPage } = await response.json();
      
      setImages(prev => [...prev, ...newImages]); // Append new images
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load initial image
  useEffect(() => {
    fetchImages(1);
  }, []);

  // Load more images
  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchImages(currentPage + 1);
    }
  };

  if (loading && images.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <body className='bg-[#111111] min-h-screen'>
        <Navbar />
        <div className='h-[100px]'></div>

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

        {currentPage < totalPages && (
          <div className="text-center my-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}

        <Footer />
      </body>
    </>
  );
}

export default Photo;