import React, { useState } from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling

export function Login() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // You can add your authentication logic here
        // For demonstration purposes, we'll just set isLoggedIn to true
        setIsLoggedIn(true);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="text-center mb-4">Bike Shop Admin Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};


