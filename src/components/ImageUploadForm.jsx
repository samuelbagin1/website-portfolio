import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ImageUploadForm = ({ onUploadSuccess }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('text', text);
    formData.append('photo', photo);

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setSuccess(true);
      onUploadSuccess(); // Call the onUploadSuccess prop
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#181818] text-[#FEFEFA] rounded-2xl">
      <h2 className="text-2xl font-boldd mb-4 md:mb-10 text-center md:text-left">Upload Image</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-2 ml-2 md:mb-4 mb-8">
        <div>
          <label htmlFor="text" className="block text-sm ">
            Text
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 p-2 w-full md:w-1/2 rounded-lg bg-[#333333] "
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className=" text-sm ">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mt-1 w-full "
            required
          />
        </div>
        <div className='flex items-center gap-4 top-6 relative ' >
          <button
            type="submit"
            disabled={loading}
            className="min-w-24 h-9 bg-[#03C03C] rounded-full hover:bg-[#02a332] transition-colors"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p className="text-[#FF0800] ">{error}</p>}
          {success && <p className="text-[#03C03C] ">Upload successful!</p>}
        </div>
      </form>
    </div>
  );
};

export default ImageUploadForm;