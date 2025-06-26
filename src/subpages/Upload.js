import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageUploadForm from '../components/ImageUploadForm';
import ImageManager from '../components/ImageManager';

function Upload() {
  const [activeTab, setActiveTab] = useState('photo');
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to refresh images after upload
  const handleUploadSuccess = () => {
    console.log(`${activeTab} uploaded successfully!`);
    setRefreshKey(prev => prev + 1);
  };

  // Content type configuration
  const contentTypes = [
    { 
      id: 'photo', 
      label: 'Photo', 
      endpoint: '/api/photo',
      fields: ['text', 'photo'] 
    },
    { 
      id: 'graphic', 
      label: 'Graphic', 
      endpoint: '/api/graphic',
      fields: ['image'] 
    },
    { 
      id: 'develop', 
      label: 'Develop', 
      endpoint: '/api/develop',
      fields: ['title', 'text', 'linkText', 'image'] 
    },
    { 
      id: 'video', 
      label: 'Video', 
      endpoint: '/api/video',
      fields: ['linkText'] 
    }
  ];

  const currentType = contentTypes.find(type => type.id === activeTab);

  return (
    <>
      <div className='bg-[#111111] min-h-lvh'>
        <Navbar />
        
        <div className='h-[100px]'></div>
        <div className='min-h-lvh'>
          <div className="container mx-auto px-4 gap-10 grid">
            
            {/* Content Type Selection Bar */}
            <div className="bg-[#181818] rounded-2xl p-4">
              <h1 className="text-2xl md:text-3xl font-boldd text-[#FEFEFA] mb-6 text-center">
                Content Management
              </h1>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {contentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setActiveTab(type.id);
                      setRefreshKey(prev => prev + 1); // Reset manager when switching
                    }}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-200 ${
                      activeTab === type.id
                        ? 'bg-[#03C03C] text-[#FEFEFA] shadow-lg'
                        : 'bg-[#333333] text-[#FEFEFA] hover:bg-[#444444]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Form */}
            <ImageUploadForm 
              onUploadSuccess={handleUploadSuccess}
              contentType={activeTab}
              endpoint={currentType.endpoint}
              fields={currentType.fields}
            />

            {/* Content Manager */}
            <ImageManager 
              key={`${activeTab}-${refreshKey}`}
              contentType={activeTab}
              endpoint={currentType.endpoint}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Upload;