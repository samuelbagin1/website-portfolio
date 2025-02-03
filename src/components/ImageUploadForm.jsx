import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

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
    <div className="p-4 bg-[#222222] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Upload Image</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-300">
            Text
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-[#333333] text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-300">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="mt-1 p-2 w-full rounded-md bg-[#333333] text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Upload successful!</p>}
      </form>
    </div>
  );
};

export default ImageUploadForm;