import React, { useState } from 'react';
import './UploadPage.css'; // Import your custom CSS file for styling

export function UploadItemsPage(){
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPictures, setItemPictures] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setItemPictures(selectedImages);

        // Generate image previews
        const previews = selectedImages.map((image) => URL.createObjectURL(image));
        setImagePreviews(previews);
    };

    const handleUpload = () => {
        // You can add your upload logic here
        // For demonstration purposes, we'll just log the item details and image files
        console.log('Item Name:', itemName);
        console.log('Item Price:', itemPrice);
        console.log('Item Description:', itemDescription);
        console.log('Item Pictures:', itemPictures);
    };

    return (
        <div className="upload-page">
            <div className="upload-container">
                <h2 className="text-center mb-4">Upload New Item</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="itemName">Name</label>
                        <input
                            type="text"
                            id="itemName"
                            className="form-control"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemPrice">Price</label>
                        <input
                            type="text"
                            id="itemPrice"
                            className="form-control"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemDescription">Description</label>
                        <textarea
                            id="itemDescription"
                            className="form-control"
                            rows="3"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemPictures">Pictures</label>
                        <input
                            type="file"
                            id="itemPictures"
                            className="form-control-file"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="image-preview-container">
                        {imagePreviews.map((preview, index) => (
                            <img
                                key={index}
                                src={preview}
                                alt={`Preview ${index}`}
                                className="image-preview"
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};


