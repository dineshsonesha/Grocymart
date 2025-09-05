import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Swal from 'sweetalert2';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getProductById = async (productId) => {
    const response = await fetch(`http://localhost:8080/products/${productId}`);
    const responseObject = await response.json();
    setProduct(responseObject.data);
    getRelatedProducts(responseObject.data.category.id, responseObject.data.id);
  };

  const getRelatedProducts = async (categoryId, currentProductId) => {
    const response = await fetch(`http://localhost:8080/products/categories/${categoryId}`);
    const responseObject = await response.json();
    const filtered = responseObject.data.filter(product => product.id !== currentProductId);
    setRelatedProducts(filtered.slice(0, 5));
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please login first!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      navigate("/login");
      return;
    }
    const response = await fetch(`http://localhost:8080/cart/add?userId=${user.id}&productId=${productId}&quantity=1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (response.ok) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Product added to cart',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    window.dispatchEvent(new Event("cartUpdated"));
    } else {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: result.message || 'Something went wrong',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };
  useEffect(() => {
    getProductById(productId);
  }, [productId]);

  if (!product) return <div className="text-center my-5">Loading product details...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="row shadow rounded-4 p-4 g-4 align-items-start bg-white">
            <div className="col-md-6 text-center">
              <img src={product.imageUrl} alt={product.title} className="img-fluid rounded shadow-sm border" style={{ maxHeight: "400px", objectFit: "contain" }} />
            </div>
            <div className="col-md-6">
              <span className="badge bg-success mb-2 px-3 py-2">{product.category.name}</span>
              <h2 className="mb-3 fw-bold">{product.title}</h2>
              <h4 className="text-success mb-3">₹{product.price} <small className="text-muted">/ {product.unit}</small></h4>
              <p className="mb-3">{product.description}</p>
              <p className="mb-4"><strong>Stock Available:</strong> {product.stock} {product.unit}</p>
              <div className="d-flex gap-3">
                <button className="btn btn-success px-4" onClick={() => handleAddToCart(product.id)} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                  <i className="bi bi-cart me-2"></i> Add to Cart
                </button>
                <button className="btn btn-outline-secondary"><i className="bi bi-share me-1"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center text-center mb-5 mt-5">
        <div className="col-md-10 d-flex justify-content-around flex-wrap gap-4">
          <div className="card p-3 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-truck fs-1 text-success"></i>
            <h6 className="mt-2">Free Delivery</h6>
            <p className="small text-muted">On orders above ₹500</p>
          </div>
          <div className="card p-3 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-arrow-repeat fs-1 text-primary"></i>
            <h6 className="mt-2">Easy Returns</h6>
            <p className="small text-muted">7-day hassle-free return policy</p>
          </div>
          <div className="card p-3 shadow-sm" style={{ width: "250px" }}>
            <i className="bi bi-shield-check fs-1 text-warning"></i>
            <h6 className="mt-2">100% Secure</h6>
            <p className="small text-muted">Safe & secure payment</p>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <h4>Related Products</h4>
        {relatedProducts.map((product) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg" style={{ flex: '0 0 20%', maxWidth: '20%' }} key={product.id}>
            <div className="card h-100 shadow-sm position-relative">
              <span className="badge bg-success position-absolute top-0 end-0 m-2 text-uppercase">{product.category.name}</span>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.imageUrl} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
              </Link>
              <div className="card-body text-center">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h5 className="card-title">{product.title}</h5>
                </Link>
                <p className="card-text"> ₹{product.price}/{product.unit}</p>
                <button className="btn btn-success w-100" onClick={() => handleAddToCart(product.id)} >Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
