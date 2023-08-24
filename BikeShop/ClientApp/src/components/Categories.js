import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import './NavMenu.css';
import categoriesData from '../categories.json'; 

export function Categories() {
    const [categories, setCategories] = useState();

    //useEffect(() => {
    //    const fetchCategories= async () => {
    //        try {
    //            const response = await fetch('weatherforecast/GetCategories');
    //            const data = await response.json();
    //            setCategories(data);
    //        } catch (error) {
    //            console.error('Error fetching categories:', error);
    //        }
    //    };

    //    fetchCategories();
    //}, []);
    useEffect(() => { setCategories(categoriesData) }, [categories])
          return (          
        <div className="page">
            <div className="categoriesContainer">
                {categories &&categories.map((category) => (
                    <Link to={`/category/${category.id}`} className="categoryLink" key={category.id}>
                        <div className="category">
                            <img src={require("../"+ category.imagePath) } alt="error"/>
                        
                                <h1>{category.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
