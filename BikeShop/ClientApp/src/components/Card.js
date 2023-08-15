// Card.js
import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ imagesPaths, name, description, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageData, setImageData] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            if (imagesPaths.length > 0) {
                const formData = new FormData();
                formData.append('imagePath', imagesPaths[currentImageIndex]);

                try {
                    const response = await fetch("weatherforecast/images", {
                        method: 'POST',
                        body: formData
                    });

                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setImageData(objectURL);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };
        fetchImage();
    }, [imagesPaths, currentImageIndex]);

    const handleAddToCart = () => {
        setIsAdded((prevIsAdded) => !prevIsAdded);
        onAddToCart(!isAdded); // Send the current "isAdded" value to the parent component
    };

    const handleNextImage = () => {
        if (currentImageIndex < imagesPaths.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div className="card">
            <div className="image-container">
                {imageData && <img src={imageData} alt={name} />}
                <div className="image-controls">
                    <button className="scroll-button prev-button" onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                        &lt;
                    </button>
                    <button className="scroll-button next-button" onClick={handleNextImage} disabled={currentImageIndex === imagesPaths.length - 1}>
                        &gt;
                    </button>
                </div>
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
            <button onClick={handleAddToCart}>
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default Card;
