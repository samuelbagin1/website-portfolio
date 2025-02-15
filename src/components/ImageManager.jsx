import React, { useState, useEffect } from 'react';
import { TbError404 } from "react-icons/tb";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ImageManager = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchImages = async () => {
            try {
                const response = await fetch(`${API_URL}/api/images`, {
                    signal: controller.signal
                });
                if (!response.ok) throw new Error('Failed to fetch images');
                const data = await response.json();
                setImages(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
        return () => controller.abort();
    }, []);

    const handleDelete = async (id, publicId) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;
      
        try {
          console.log('Starting deletion of:', { id, publicId });
          
          const response = await fetch(`${API_URL}/api/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Add authorization header if needed
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              id: id.toString(),
              publicId: publicId.toString()
            }),
            credentials: 'include' // Required for cookies/sessions
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Delete request failed');
          }
      
          setImages(prev => prev.filter(img => img._id !== id));
          console.log('Successfully deleted image:', id);
      
        } catch (error) {
          console.error('Delete Failed:', {
            error: error.message,
            id,
            publicId,
            timestamp: new Date().toISOString()
          });
          setError(`Delete failed: ${error.message}`);
        }
      };

    if (loading) return <div className="text-white">Loading images...</div>;
    if (error) return <div className="text-[#FF0800] flex justify-center gap-2"><TbError404 size='24'/>Error: {error}</div>;

    return (
        <div className="p-4 text-[#111111]">
            <h2 className="text-3xl text-[#FEFEFA] mb-6 text-center font-boldd">Manage Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map(image => (
                    <div key={image._id} className="grid justify-items-stretch bg-[#dadada] rounded-xl p-4 ">
                        <img
                            src={image.photo}
                            alt={image.text}
                            className="w-full h-48 object-cover rounded-md mb-2"
                        />
                        {/*<p className=" mb-2">{image.text}</p>*/}
                        <button
                            onClick={() => handleDelete(image._id, image.publicId)}
                            className="justify-self-center mt-2 py-2 bg-[#FF0800] rounded-full w-1/2 hover:bg-[#e40800] transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageManager;