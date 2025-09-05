import React, { useEffect, useState } from 'react';

export default function ManageOrderList() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await fetch('http://localhost:8080/orders/all');
        const responseObject = await response.json();
        setOrders(responseObject.data);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await fetch(`http://localhost:8080/order/status/update/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });
            fetchOrders();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const statusOptions = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

    return (
        <div className="d-flex">
            <div className="d-none d-lg-block" style={{ width: 250 }}></div>
            <div className="flex-grow-1 p-4">
                <button className="btn btn-dark d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas">
                    <i className="bi bi-list"></i> Menu
                </button>
                <div className="card shadow rounded-4 p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="mb-0">All Orders</h3>
                    </div>
                    <div className="rounded-4 overflow-hidden border">
                        <table className="table table-bordered align-middle text-center mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>User</th>
                                    <th>Order Date</th>
                                    <th>Items</th>
                                    <th>Total (₹)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-muted">No orders found</td>
                                    </tr>
                                )}
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user?.username}</td>
                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td>
                                            <ul className="list-unstyled mb-0 text-start d-inline-block text-center">
                                                {order.carts?.map(cart => (
                                                    <li key={cart.id}>{cart.product?.title} × {cart.quantity}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>₹{order.totalAmount.toFixed(2)}</td>
                                        <td>
                                            <select className="form-select form-select-sm mx-auto" style={{ width: '120px', paddingRight: '1.8rem', fontSize: '0.85rem' }} value={order.orderStatus} onChange={(e) => handleStatusChange(order.id, e.target.value)} >
                                                {statusOptions.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
