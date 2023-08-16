import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { HomePage } from "./components/HomePage";
import { OrderPage } from "./components/OrderPage";
import { NavMenu } from './components/NavMenu';
import { Layout } from './components/Layout';
import { AdminPage } from './components/AdminPage';
import { UploadItemsPage } from './components/UploadItemsPage';
import { Login } from './components/Login';
import './custom.css';

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true);
    return (
        <>
            <NavMenu isAdmin={isAdmin} />
        <Routes>
           
                <Route path="/" element={<HomePage isAdmin={isAdmin}  cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/order" element={<OrderPage isAdmin={isAdmin} cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/admin" element={< AdminPage isAdmin={isAdmin} />} />
                <Route path="/login" element={< Login isAdmin={isAdmin} setIsAdmin={ setIsAdmin} />} />
                <Route path="/upload" element={< UploadItemsPage isAdmin={isAdmin} />} />
                
                


                { /*
               {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
               })} 
                */}

                
            </Routes>
            </>
      
    );
}
