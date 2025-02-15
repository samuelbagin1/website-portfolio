import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageUploadForm from '../components/ImageUploadForm'; // Import the form
import ImageManager from '../components/ImageManager';

function Upload() {

  const [refreshKey, setRefreshKey] = useState(0);
  // Function to refresh images after upload (optional, if needed)
  const handleUploadSuccess = () => {
    console.log('Image uploaded successfully!');
    setRefreshKey(prev => prev + 1);
    // You can add logic here to refresh the image list or navigate to another page
  };

  return (
    <>
      <div className='bg-[#111111] min-h-lvh ' >
        <Navbar />

        <div className='h-[100px]'></div>
        <div className=" container mx-auto px-4 gap-10 grid min-h-screen">
          <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
          <ImageManager key={refreshKey} />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Upload