import React, { useState, useEffect } from 'react';
import './Card.css';
import { DeletePopUp } from './DeletePopUp';
const Card = ({ imagesPaths, name, description, onAddToCart, images, isAdmin ,ItemId ,price}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    
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
    const popUpDelete = () => {
        setShowPopup(true);
    }


    return (
        <div className="card">
            {isAdmin && (
                <button className="deleteButton" onClick={popUpDelete}>
                    <span role="img" aria-label="Delete Icon">
                        🗑️
                    </span>
                </button>
            )}
            {showPopup && <DeletePopUp showPopup={showPopup} setShowPopup={setShowPopup} ItemId={ItemId} />}
            <div className="image-container">
                <img src={"data:image/png;base64," + images[currentImageIndex]} alt=" "  />
                <div className="image-controls">
                    <button className="scroll-button prev-but   ton" onClick={handlePrevImage} >
                        &lt;
                    </button>
                    <button className="scroll-button next-button" onClick={handleNextImage} >
                        &gt;
                    </button>
                </div>
            </div>
            <h3>{name}</h3>
            <p>Price: ₪{price}</p>
            <p>{description}</p>
            <button onClick={handleAddToCart}>
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default Card;
