import React from 'react';
import './AdminPage.css'
// need to fetch the data from the json file 


export function AdminPage({ isAdmin }) {

    if (isAdmin !== true) {
        return <>you need to log in as admin to see this page</>
    }
    const dummyOrders = [
        {
            id: 1,
            items: [
                { itemId: 101, itemName: 'Mountain Bike' },
                { itemId: 102, itemName: 'Helmet' },
            ],
            phoneNumber: '123-456-7890',
            address: '123 Main St, Cityville',
        },
        // Add more dummy orders here
    ];

    //console.log("date "+ordersData)

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
                    {dummyOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                                <ul className="list-unstyled">
                                    {order.items.map((item) => (
                                        <li key={item.itemId}>
                                            {item.itemName} (ID: {item.itemId})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};


