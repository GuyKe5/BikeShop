import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
export function NavMenu() {
    return(
    <header className="navbar">
        <div className="logo-container">
            {/*<img src={logo} alt="Bike Shop Logo" className="logo"  */}
            <h1>Bike Shop</h1>
        </div>
        <nav>
            <ul className="nav-links">
                <li>
                    <a href="#about">About</a>
                </li>
                <li>
                    <a href="#products">Products</a>
                </li>
                <li>
                    <a href="#contact">Contact</a>
                </li>
            </ul>
        </nav>
    </header>
)}