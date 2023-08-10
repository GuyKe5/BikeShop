import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { HomePage } from "./components/HomePage";
import { OrderPage } from "./components/OrderPage";
import { NavMenu } from './components/NavMenu';
import { Layout } from './components/Layout';
import { AdminPage } from './components/AdminPage';
import { Login } from './components/Login';
import './custom.css';

export default function App() {
    const [cartItems, setCartItems] = useState([]);
    return (
        <>
        <NavMenu />
        <Routes>
           
                <Route path="/" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/order" element={<OrderPage cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/Admin" element={< AdminPage />} />
                <Route path="/Login" element={< Login />} />
                


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
