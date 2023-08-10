import React, { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import './OrderPage.css'    

 export function  OrderPage(props){
   
     

     const cartItems = props.cartItems;
     const setCartItems = props.setCartItems;
     

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

 
     function handleRemoveItem(itemId) {
         let newItemArray = [];
         setCartItems((prev) => {
             for (let i = 0; i < prev.length; i++) {
                 if (prev[i].id !== itemId) {
                     newItemArray.push(prev[i])
                 }
             }
         })
        
         setCartItems(newItemArray)
     }

  

  const handlePhoneChange = (event) => { 
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div className="order-page">
      <h2>Your Order</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span className="item-title">{item.title}</span>
            <span className="item-quantity">Quantity: {item.quantity}</span>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="contact-form">
        <h3>Contact Information</h3>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Enter your phone number"
        />

        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter your address"
        />
      </div>

      <button className="submit-button">Place Order</button>
    </div>
  );
};


