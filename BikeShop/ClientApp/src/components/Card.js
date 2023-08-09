// Card.js

import React, { useState } from 'react';
import './Card.css'
const Card = ({ image, title, description, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded((prevIsAdded) => !prevIsAdded);
    onAddToCart(!isAdded); // Send the current "isAdded" value to the parent component
  };

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={handleAddToCart}>
        {isAdded ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default Card;
