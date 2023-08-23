import React, { useState } from 'react';
import "./DeletePopUp.css";

export function DeletePopUp({ ItemId, showPopup, setShowPopup }) {

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const handleDelete = () => {
        const formData = new FormData()
        formData.append('ItemId',ItemId)
        fetch('weatherforecast/DeleteItem', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
               
              
            })
        setShowPopup(false);
        

    }

    return (
        <div className="popUp">
            {showPopup && (
                <div className="popupContent">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={togglePopup}>Cancel</button>
                    <button onClick={ handleDelete}>Delete</button>
                </div>
            )}
            <button onClick={togglePopup}>Show Delete Pop-Up</button>
        </div>
    );
}
