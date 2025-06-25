import React, { useState, useEffect } from 'react';
import { TbError404 } from "react-icons/tb";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ImageManager = ({ contentType, endpoint }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}${endpoint}`, {
                    signal: controller.signal
                });
                if (!response.ok) throw new Error(`Failed to fetch ${contentType} items`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
        return () => controller.abort();
    }, [contentType, endpoint]);

    const handleDelete = async (item) => {
        if (!window.confirm(`Are you sure you want to delete this ${contentType} item?`)) return;
      
        try {
            console.log('Starting deletion of:', { id: item._id, contentType });
            
            const deletePayload = { id: item._id.toString() };
            
            // Add publicId for items that have images (photo, graphic, develop)
            if (item.publicId) {
                deletePayload.publicId = item.publicId.toString();
            }
            
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deletePayload),
                credentials: 'include'
            });
      
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Delete request failed');
            }
      
            setItems(prev => prev.filter(i => i._id !== item._id));
            console.log('Successfully deleted item:', item._id);
      
        } catch (error) {
            console.error('Delete Failed:', {
                error: error.message,
                id: item._id,
                contentType,
                timestamp: new Date().toISOString()
            });
            setError(`Delete failed: ${error.message}`);
        }
    };

    const renderItemContent = (item) => {
        switch (contentType) {
            case 'photo':
                return (
                    <>
                        <img
                            src={item.photo}
                            alt={item.text}
                            className="w-full h-48 object-cover rounded-md mb-2"
                        />
                        <p className="text-sm text-[#CCCCCC] mb-2">{item.text}</p>
                    </>
                );
            
            case 'graphic':
                return (
                    <img
                        src={item.image}
                        alt="Graphic"
                        className="w-full h-48 object-cover rounded-md mb-2"
                    />
                );
            
            case 'develop':
                return (
                    <>
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-md mb-2"
                        />
                        <h3 className="font-boldd text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-[#CCCCCC] mb-2">{item.text}</p>
                        <a 
                            href={item.linkText} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#03C03C] text-sm hover:underline"
                        >
                            View Project →
                        </a>
                    </>
                );
            
            case 'video':
                return (
                    <div className="p-4 bg-[#333333] rounded-md">
                        <div className="mb-4">
                            <h4 className="text-lg font-medium mb-2">Video Link</h4>
                            <a 
                                href={item.linkText} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#03C03C] hover:underline break-all"
                            >
                                {item.linkText}
                            </a>
                        </div>
                        <p className="text-xs text-[#AAAAAA]">
                            Created: {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                );
            
            default:
                return <p>Unknown content type</p>;
        }
    };

    if (loading) return (
        <div className="text-[#FEFEFA] flex justify-center gap-2">
            Loading {contentType} items...
        </div>
    );
    
    if (error) return (
        <div className="text-[#FF0800] flex justify-center gap-2">
            <TbError404 size='24'/>Error: {error}
        </div>
    );

    return (
        <div className="p-4 text-[#FEFEFA]">
            <h2 className="text-2xl md:text-3xl text-[#FEFEFA] mb-6 text-center font-boldd">
                Manage {contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content
            </h2>
            
            {items.length === 0 ? (
                <div className="text-center text-[#CCCCCC] py-8">
                    No {contentType} items found. Upload some content to get started!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => (
                        <div key={item._id} className="grid justify-items-stretch bg-[#dadada15] rounded-xl p-4">
                            {renderItemContent(item)}
                            <button
                                onClick={() => handleDelete(item)}
                                className="justify-self-center mt-4 py-2 bg-[#FF0800] rounded-full w-1/2 hover:bg-[#cb0700] transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageManager;