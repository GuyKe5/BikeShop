    // HomePage.js
    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom'; // Import Link from React Router
    import Card from './Card.js';

    import './HomePage.css'
    import './NavMenu.css'
export function HomePage(props) {
        
      const [products, setProducts] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 6; // You can adjust this based on the number of cards you want per page
     
    const { cartItems, setCartItems } = props;
    

      useEffect(() => {
        // Fetch or load your bike product data here and set it in the "products" state
        // For demonstration purposes, we'll use dummy data
        const dummyData = [
          { id: 1, image: 'bike1.jpg', title: 'Mountain Bike 1', description: 'A versatile mountain bike for all terrains.' },
          { id: 2, image: 'bike2.jpg', title: 'Mountain Bike 2', description: 'Another great mountain bike for adventurous rides.' },
          // Add more bike products...
        ];
        setProducts(dummyData);
      }, []);

      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

      const handleAddToCart = (productId) => {
        // Find the product in the cart
        const productInCart = cartItems.find((item) => item.id === productId);

        // If the product is already in the cart, remove it; otherwise, add it to the cart
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
       
          {/* Header (Navigation Bar) */}
      

          {/* Cards Section */}
          <div className="cards-container">
            {products.slice(startIndex, endIndex).map((product) => (
              <Card
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>

          {/* Pagination Section */}
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

          {/* Cart Icon */}
          <div className="cart-icon-container">
            {/* Link the cart icon to the order page */}
            <Link to= {"/order"}
               

            >
              <span className="cart-item-count">{cartItems.length}</span>
              <img className="cart-icon" src={require("../images/shopping-cart.png")} alt="Cart Icon" />
            </Link>
          </div>

          {/* Button to go to the order page */}
              <div className="order-button">
            
                  <Link to={"/order"}
                    
                className="button-style">
                
                    go to order page
                  </Link>
      
                
          </div>
        </div>
      );
    };

