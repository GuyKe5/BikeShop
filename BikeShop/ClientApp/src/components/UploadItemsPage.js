﻿import React, { useState } from 'react';
import './UploadPage.css'; // Import your custom CSS file for styling

export function UploadItemsPage() {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);

    const [images, setImages] = useState('')
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [image5, setImage5] = useState()
    const handleImageChange = (e) => {




        const selectedImages = Array.from(e.target.files);

        var z = e.target.files
        if (z.length > 0) {
            setImage1(z[0])
        }
        if (z.length > 1) {
            setImage2(z[1])
        }
        if (z.length > 2) { setImage3(z[2]) }
        if (z.length > 3) { setImage4(z[3]) }
        if (z.length > 4) { setImage5(z[4]) }


        // Generate image previews
        const previews = selectedImages.map((image) => URL.createObjectURL(image));
        setImagePreviews(previews);
    };

    const handleUpload = async () => {
        try {
            // Create an object representing the item data
            const newItem = {
                id: -1,

                name: itemName,
                price: itemPrice,
                description: itemDescription,
                imagesPaths: ""
            };


            const formData = new FormData()
            formData.append('id', -1)
            //formData.append('images', images)
            formData.append('name', itemName)
            formData.append('price', itemPrice)
            formData.append('description', itemDescription)
            formData.append('image1', image1)
            formData.append('image2', image2)
            formData.append('image3', image3)
            formData.append('image4', image4)
            formData.append('image5', image5)


            fetch('weatherforecast/UploadItem', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    // Handle success response from the controller
                    console.log(data);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error uploading image:', error);
                });



            // Convert the item object to a Base64-encoded JSON string
            const json = JSON.stringify(newItem)

            // Build the query string
            const queryString = `json=${json}`;

            // Make an HTTP GET request to upload the item data
            const response = await fetch(`weatherforecast/UploadItem?${queryString}`);



            if (response.ok) {
                // Item uploaded successfully
                console.log('Item uploaded successfully');
                // You can handle any further actions, such as updating state, displaying a success message, etc.
            } else {
                // Handle errors
                console.error('Error uploading item:', response.statusText);
                // You can display an error message or take appropriate actions
            }
        } catch (error) {
            // Handle unexpected errors
            console.error('Error:', error);
            // You can display an error message or take appropriate actions
        }
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
                            name="file"
                            multiple
                            id="itemPictures"
                            className="form-control-file"

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


