import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import './NavMenu.css';
import categoriesData from '../categories.json';

export function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    return (
        <div className="page">
            <div className="categoriesContainer">
                {categories.map((category) => (
                    <Link as={Link} to={"/items"} state={{ category: category.id, categoryName: category.name }} key={category.id}>
                        <div className="category">
                            <img src={category.imagePath} alt="error" className="categoryImage" />
                            <h1>{category.name}</h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
