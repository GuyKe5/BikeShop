import React from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function NavMenu({ isAdmin }) {
    return (
        <header className="navbar">
            <div className="logo-container">
                <h1 className="logo-text">
                    <Link to={"/"}>Bike Shop</Link>
                </h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    {isAdmin && (
                        <>
                            <li>
                                <Link to={"/admin"}>Admin</Link>
                            </li>
                            <li>
                                <Link to={"/upload"}>Upload</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
