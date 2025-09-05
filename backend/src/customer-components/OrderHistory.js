import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";

export default function OrderHistory() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      const response = await fetch(`http://localhost:8080/orders/user/${user.id}`);
      const responseObject = await response.json();
      setOrders(responseObject.data || []);
    };
    fetchOrders();
  }, [user?.id]);
  const totalSales = orders.filter(order => order.orderStatus !== 'CANCELLED').reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders  = orders.length;
  const totalItems   = orders.reduce((a, b) => a + (b.carts?.length || 0), 0);

  return (
    <div className="container my-5">
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm rounded-4 text-center p-3">
            <h6 className="text-muted mb-1">Total Spent</h6>
            <h3 className="fw-bold text-success">₹{totalSales.toFixed(2)}</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm rounded-4 text-center p-3">
            <h6 className="text-muted mb-1">Total Orders</h6>
            <h3 className="fw-bold">{totalOrders}</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm rounded-4 text-center p-3">
            <h6 className="text-muted mb-1">Items Purchased</h6>
            <h3 className="fw-bold">{totalItems}</h3>
          </div>
        </div>
      </div>
      {orders.length === 0 ? (
        <p className="text-center text-muted">You haven’t placed any orders yet.</p>
      ) : (
        <div className="row g-4">
          {orders.map(order => (
            <div className="col-12" key={order.id}>
              <div className="card shadow-sm rounded-4 p-3">
                <div className="d-flex justify-content-between flex-wrap">
                  <div>
                    <h6 className="mb-0 fw-semibold">Order&nbsp;# {order.id}</h6>
                    <small className="text-muted">{new Date(order.orderDate).toLocaleString()}</small>
                  </div>
                  <span className={`badge text-bg-${order.orderStatus === "CONFIRMED" ? "success": order.orderStatus === "DELIVERED" ? "primary": order.orderStatus === "CANCELLED" ? "danger": "warning"} align-self-center`}>{order.orderStatus}</span>
                </div>
                <hr />
                {order.carts?.map(cart => (
                  <div className="d-flex mb-2" key={cart.id}>
                    <img src={cart.product?.imageUrl} alt={cart.product?.title} style={{ width: 50, height: 50, objectFit: "contain" }} className="border rounded me-3" />
                    <div className="flex-grow-1">
                      <p className="mb-0 fw-semibold">{cart.product?.title}</p>
                      <small className="text-muted">Qty&nbsp;{cart.quantity} &nbsp;|&nbsp; ₹{cart.product?.price}</small>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <span className="fw-bold">Total: ₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
