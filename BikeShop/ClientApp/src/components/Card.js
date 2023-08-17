import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ imagesPaths, name, description, onAddToCart, images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
   
    useEffect(() => {
        setCurrentImageIndex(0); // Reset the current image index when images change
    }, [images]);

    const handleAddToCart = () => {
        setIsAdded((prevIsAdded) => !prevIsAdded);
        onAddToCart(!isAdded); // Send the current "isAdded" value to the parent component
    };

    const handleNextImage = () => {
      
       
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            
        }
       
        else {
            setCurrentImageIndex(0);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
        else{
            setCurrentImageIndex(images.length-1);
        }
    };

    return (
        <div className="card">
            <div className="image-container">
                <img src={"data:image/png;base64," + images[currentImageIndex]} alt=" couldn't be loaded"  />
                <div className="image-controls">
                    <button className="scroll-button prev-button" onClick={handlePrevImage} >
                        &lt;
                    </button>
                    <button className="scroll-button next-button" onClick={handleNextImage} >
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
