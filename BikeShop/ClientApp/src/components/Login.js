import React, { useState } from 'react';
import './LoginPage.css'; // Import your custom CSS file for styling

export function Login({ isAdmin,setIsAdmin}) { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    const handleLogin = async () => {
        // You can add your authentication logic here
        // For demonstration purposes, we'll just set isLoggedIn to true
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch("weatherforecast/Login", {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setIsAdmin(true)
                setMsg("Logged in")
            }
            else {
                setMsg("username or password are wrong")
            }

        } catch (error) {
            setMsg("error")
            console.error("error loggin in");
        }
    }
            
      
       
  

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
                { msg}
            </div>
        </div>
    );
};


