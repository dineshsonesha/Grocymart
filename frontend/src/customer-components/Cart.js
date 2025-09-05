import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";

export default function Cart() {
  const [items, setItems] = useState([]);
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const fetchCart = async () => {
    if (!userId) return;
    const response = await fetch(`http://localhost:8080/cart/${userId}`);
    const responseObject = await response.json();
    setItems(responseObject.data);
  };
  useEffect(() => {
    fetchCart();
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [userId]);

  const updateQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;
    await fetch(`http://localhost:8080/cart/update/${cartId}?quantity=${newQty}`, { method: 'PUT' });
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const removeItem = async (id) => {
    await fetch(`http://localhost:8080/cart/delete/${id}`, { method: 'DELETE' });
    fetchCart();
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const totalAmount = (items || []).reduce((sum, item) => {
    if (item.product && typeof item.product.price === 'number') {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  const handleCheckout = async () => {
    if (!user || !user.id) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        title: 'Please login to checkout',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1600,
      });
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/order/place/${user.id}`, {
        method: 'POST',
      });
      const responseData = await response.json();

      if (response.ok) {
        Swal.fire({
          toast: true,
          icon: 'success',
          title: responseData.message || 'Order placed successfully!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
        fetchCart();
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        Swal.fire({
          toast: true,
          icon: 'error',
          title: responseData.message || 'Checkout failed!',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'Server error during checkout!',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (!items) return <div className="text-center mt-5">Loading cart items...</div>

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold fs-5">Your Cart</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body p-0 d-flex flex-column justify-content-between">
        <div className="list-group list-group-flush overflow-auto px-2" style={{ maxHeight: 'calc(100vh - 160px)' }}>
          {items.map(item => (
            <div key={item.id} className="list-group-item py-3 border-bottom">
              <div className="d-flex align-items-start gap-3">
                <img src={item.product.imageUrl} alt={item.product.title} width="84" height="84" className="border rounded" style={{ objectFit: "contain" }} />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">{item.product.title}</h6>
                      <small className="text-muted">{item.product.price}/{item.product.unit}</small>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="btn btn-link p-0 text-danger fw-semibold" >
                      <i className="bi bi-trash3 me-1"></i>Remove
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <button className="btn btn-sm btn-outline-dark disabled">{item.quantity}</button>
                      <button className="btn btn-sm btn-outline-dark" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="fw-bold">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-top bg-white">
          <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
            <button className="btn btn-secondary w-40 w-md-auto" data-bs-dismiss="offcanvas"> Continue Shopping </button>
            <button className="btn btn-success w-40 w-md-auto" onClick={handleCheckout}> Proceed To Checkout </button>
          </div>
          <div className="text-end fw-bold fs-5">Total: ₹{totalAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
