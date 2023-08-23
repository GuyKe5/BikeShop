import React, { useState, useEffect } from 'react';
import './AdminPage.css';

export function AdminPage({ isAdmin }) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (isAdmin === true) {
            const fetchOrders = async () => {
                try {
                    const response = await fetch('weatherforecast/GetOrders');
                    const data = await response.json();
                    setOrders(data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
            fetchOrders();
        }
    }, []);

    const [expandedRows, setExpandedRows] = useState([]);

    const handleToggle = (orderId) => {
        if (expandedRows.includes(orderId)) {
            setExpandedRows(expandedRows.filter(id => id !== orderId));
        } else {
            setExpandedRows([...expandedRows, orderId]);
        }
    };

    if (isAdmin !== true) {
        return <>You need to log in as an admin to see this page</>;
    }

    return (
        <div className="AdminPage">
            <div className="container mt-4">
                <h2 className="text-center mb-4">Admin Page - Bike Shop Orders</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Items</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(orders)}
                        {orders &&
                            orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary" // Change the button class
                                                onClick={() => handleToggle(order.id)}
                                            >
                                                Toggle
                                            </button>
                                        </td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                    </tr>
                                    {expandedRows.includes(order.id) && (
                                        <tr>
                                            <td colSpan="4">
                                                <ul className="list-unstyled">
                                                    {order.items.map((item, index) => (
                                                        <li key={item.id} className="item">
                                                            <strong>Item {index + 1}</strong>
                                                            <p>Name: {item.name}</p>
                                                            <p>Price: ₪{item.price}</p>
                                                            <p>Description: {item.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
