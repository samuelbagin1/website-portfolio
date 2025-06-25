import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ImageUploadForm = ({ onUploadSuccess, contentType, endpoint, fields }) => {
  // Form state
  const [formData, setFormData] = useState({
    text: '',
    title: '',
    linkText: '',
    photo: null,
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reset form when content type changes
  useEffect(() => {
    setFormData({
      text: '',
      title: '',
      linkText: '',
      photo: null,
      image: null
    });
    setError(null);
    setSuccess(false);
  }, [contentType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let response;

      if (contentType === 'video') {
        // Video only needs JSON data
        response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            linkText: formData.linkText
          }),
        });
      } else {
        // Other types need FormData for file uploads
        const submitFormData = new FormData();
        
        // Add fields based on content type
        if (fields.includes('text')) submitFormData.append('text', formData.text);
        if (fields.includes('title')) submitFormData.append('title', formData.title);
        if (fields.includes('linkText')) submitFormData.append('linkText', formData.linkText);
        if (fields.includes('photo') && formData.photo) submitFormData.append('photo', formData.photo);
        if (fields.includes('image') && formData.image) submitFormData.append('image', formData.image);

        response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          body: submitFormData,
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to upload ${contentType}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setSuccess(true);
      onUploadSuccess();
      
      // Reset form after successful upload
      setFormData({
        text: '',
        title: '',
        linkText: '',
        photo: null,
        image: null
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    return (
      <>
        {/* Title field - for Develop */}
        {fields.includes('title') && (
          <div>
            <label htmlFor="title" className="block text-sm">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="mt-1 p-2 w-full md:w-1/2 rounded-lg bg-[#333333]"
              required
            />
          </div>
        )}

        {/* Text field - for Photo and Develop */}
        {fields.includes('text') && (
          <div>
            <label htmlFor="text" className="block text-sm">
              {contentType === 'develop' ? 'Description *' : 'Text *'}
            </label>
            <input
              type="text"
              id="text"
              value={formData.text}
              onChange={(e) => handleInputChange('text', e.target.value)}
              className="mt-1 p-2 w-full md:w-1/2 rounded-lg bg-[#333333]"
              required
            />
          </div>
        )}

        {/* Link Text field - for Develop and Video */}
        {fields.includes('linkText') && (
          <div>
            <label htmlFor="linkText" className="block text-sm">
              {contentType === 'video' ? 'Video Link *' : 'Project Link *'}
            </label>
            <input
              type="text"
              id="linkText"
              value={formData.linkText}
              onChange={(e) => handleInputChange('linkText', e.target.value)}
              className="mt-1 p-2 w-full md:w-1/2 rounded-lg bg-[#333333]"
              placeholder={contentType === 'video' ? 'Enter video URL' : 'Enter project URL'}
              required
            />
          </div>
        )}

        {/* Photo field - for Photo content type */}
        {fields.includes('photo') && (
          <div>
            <label htmlFor="photo" className="text-sm">
              Photo *
            </label>
            <input
              type="file"
              id="photo"
              onChange={(e) => handleFileChange('photo', e.target.files[0])}
              className="mt-1 w-full appearance-none"
              accept="image/*"
              required
            />
          </div>
        )}

        {/* Image field - for Graphic and Develop */}
        {fields.includes('image') && (
          <div>
            <label htmlFor="image" className="text-sm">
              Image *
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => handleFileChange('image', e.target.files[0])}
              className="mt-1 w-full appearance-none"
              accept="image/*"
              required
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-4 md:p-10 bg-[#181818] text-[#FEFEFA] rounded-2xl">
      <h2 className="text-2xl font-boldd mb-4 md:mb-10 text-center md:text-left">
        Upload {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 ml-2 md:mb-4 mb-8">
        {renderFormFields()}
        
        <div className='flex items-center gap-4 top-6 relative'>
          <button
            type="submit"
            disabled={loading}
            className="min-w-24 h-9 bg-[#03C03C] rounded-full hover:bg-[#02a332] transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p className="text-[#FF0800]">{error}</p>}
          {success && <p className="text-[#03C03C]">Upload successful!</p>}
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;