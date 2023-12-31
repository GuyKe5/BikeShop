import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card.js';
import './HomePage.css';
import './NavMenu.css';
import { json, useLocation, useParams } from "react-router-dom";
export function HomePage(props) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isDeleted, setIsDeleted] = useState(false);
    const { cartItems, setCartItems } = props;
    const location = useLocation();
    const [category, setCategory] = useState(location.state.category)
    const [categoryName, setCategoryName] = useState(location.state.categoryName)
    const [isLoading, setIsLoading] = useState(true);
    console.log(location.state.category)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const formData = new FormData()
                formData.append('category', category)
                fetch('weatherforecast/GetitemsByCategory', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {


                        setProducts(data)
                        setIsLoading(false)
                    })
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [isDeleted, category]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (productId) => {
        const productInCart = cartItems.find((item) => item.id === productId);

        if (productInCart) {
            setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== productId));
        } else {
            const productToAdd = products.find((product) => product.id === productId);
            setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        
        <div className="homepage">
            <h1 className="category">{categoryName}</h1>
            {isLoading && "Loading..." }
            <div className="cards-container">
                {products.slice(startIndex, endIndex).map((product) => (
                    <Card
                        key={product.id}
                        imagesPaths={product.imagesPaths}
                        images={product.images}
                        name={product.name}
                        description={product.description}
                        ItemId={product.id}
                        isAdmin={props.isAdmin}
                        price={product.price}
                        setIsDeleted={setIsDeleted}
                        onAddToCart={() => handleAddToCart(product.id)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <span
                            key={pageNumber}
                            className={pageNumber === currentPage ? 'active' : ''}
                            onClick={() => handlePageChange(pageNumber)}
                        >
                            {pageNumber}
                        </span>
                    ))}
                </div>
            )}

            <div className="cart-icon-container">
                <Link to="/order">
                    <span className="cart-item-count">{cartItems.length}</span>
                    <img className="cart-icon" src={require("../images/shopping-cart.png")} alt="Cart Icon" />
                </Link>
            </div>

            <div className="order-button">
                <Link to="/order" className="button-style">
                    Go to order page
                </Link>
            </div>
        </div>
    );
}
