import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';



export function NavMenu() {
    return (




    <header className="navbar">
        <div className="logo-container">
            {/*<img src={logo} alt="Bike Shop Logo" className="logo"  */}
            <h1> <Link to={"/"} > Bise Shop </Link> </h1>
        </div>
        <nav>
            <ul className="nav-links">
                <li>
                        <Link to={"/login"} > login </Link> 
                </li>
                <li>
                        <Link to={"/admin"} > admin </Link> 
                </li>
                <li>
                        <Link to={"/upload"} > upload </Link> 
                </li>
            </ul>
        </nav>
    </header>
)}