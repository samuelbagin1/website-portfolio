import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageUploadForm from '../components/ImageUploadForm'; // Import the form

function Upload() {

    // Function to refresh images after upload (optional, if needed)
  const handleUploadSuccess = () => {
    console.log('Image uploaded successfully!');
    // You can add logic here to refresh the image list or navigate to another page
  };

  return (
    <>
      <body className='bg-[#111111] min-h-screen' >
        <Navbar />
        
        <div className=' relative top-[100px] min-h-screen'>
          {/* Add the ImageUploadForm and pass handleUploadSuccess as a prop */}
            <div className="container mx-auto px-4">
                <ImageUploadForm onUploadSuccess={handleUploadSuccess} />
            </div>
        </div>

        <Footer />
      </body>
    </>
  );
}

export default Upload