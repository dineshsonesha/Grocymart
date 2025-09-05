import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';

export default function CustomerHome() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([])
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await fetch('http://localhost:8080/categories/all');
    const responseObject = await response.json();
    setCategories(responseObject.data);
  };
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/products/all');
    const result = await response.json();
    setProducts(result.data);
  };
  useEffect(() => {fetchCategories().then(()=>{fetchProducts()})}, []);

  const { filterProductByCategory } = useOutletContext();
    const handleCategoryClick = (category) => {
      filterProductByCategory(category.name);
      navigate(`/products/${category.id}`); 
    };
    const handleAddToCart = async (productId) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Please login to add items to cart',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1600,
      });
      navigate('/login')
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
        icon: 'success',
        title: 'Product added to cart',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
      window.dispatchEvent(new Event("cartUpdated"));
    } else {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: result.message || "Something went wrong",
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (!products) return <div className="text-center mt-5">Loading products...</div>;
  if (!categories) return <div className="text-center mt-5">Loading categories...</div>;

  return (
    <div className="container-fluid p-0">
      <div id="carouselExampleIndicators" className="carousel slide my-4" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner rounded-4">
          <div className="carousel-item active position-relative">
            <img src="https://www.appristine.com/images/grocery/home-hero.webp" className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="Slide 1" />
            <div className="position-absolute top-0 start-0 h-100 d-flex align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '2rem', width: '100%', zIndex: 5, pointerEvents: 'auto' }}>
              <div className="text-white">
                <span className="badge bg-warning text-dark mb-2">Special Offer</span>
                <h2 className="fw-bold">SuperMarket For Fresh Grocery</h2>
                <p className="mb-3">Shop fresh groceries delivered to your doorstep.</p>
                <div className="position-relative z-3">
                  <Link to="/products/all" className="btn btn-success">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item position-relative">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1374&q=80" className="d-block w-100" style={{ height: '450px', objectFit: 'cover' }} alt="Slide 2" />
            <div className="position-absolute top-0 start-0 h-100 d-flex align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '2rem', width: '100%', zIndex: 5, pointerEvents: 'auto' }}>
              <div className="text-white">
                <span className="badge bg-success text-white mb-2">Fresh Deals</span>
                <h2 className="fw-bold">Get Organic Fruits & Veggies</h2>
                <p className="mb-3">100% farm fresh and organic grocery items.</p>
                <div className="position-relative z-3">
                  <Link to="/products/all" className="btn btn-success">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container my-5">
        <h4 className="mb-3">Featured Categories</h4>
        <div className="row g-3">
          {categories.slice(0, 6).map((category) => (
            <div key={category.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <div className="card h-100 shadow-sm text-center p-2" onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }}>
                <img src={category.imageUrl} alt={category.name} className="img-fluid mb-2" style={{ height: '100px', objectFit: 'contain' }} />
                <div className="card-body p-2">
                  <p className="card-text fw-bold">{category.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Popular Products</h4>
          <Link to="/products/all" className="btn btn-link text-success fw-semibold text-decoration-none">View All <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div className="row g-4">
        {products && products.slice(0,10).map((product) => {
          return (
            <div className="col-6 col-sm-4 col-md-3 col-lg" style={{ flex: '0 0 20%', maxWidth: '20%' }} key={product.id}>
              <div className="card h-100 shadow-sm position-relative">
                <span className="badge bg-success position-absolute top-0 end-0 m-2 text-uppercase">{product.category?.name}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}><img src={product.imageUrl} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain' }}/></Link>
                <div className="card-body text-center">
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}><h5 className="card-title">{product.title}</h5></Link>
                  <p className="card-text"> ₹{product.price}/{product.unit}</p>
                  <button className="btn btn-success w-100" onClick={() => handleAddToCart(product.id)} > Add to Cart </button>
                </div>
              </div>
            </div>
          );
        })}
       </div>
      </div>
      <div className="container">
        <h4 className="text-center fw-bold mb-5">Why Shop With Us?</h4>
        <div className="row text-center">
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="px-3">
              <i className="bi bi-clock text-success fs-1 mb-3"></i>
              <h5 className="fw-semibold mb-2">10 Minute Grocery Now</h5>
              <p className="text-muted small mb-0">Get your order delivered to your doorstep at the earliest from FreshCart pickup stores near you.</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="px-3">
              <i className="bi bi-gift text-success fs-1 mb-3"></i>
              <h5 className="fw-semibold mb-2">Best Prices & Offers</h5>
              <p className="text-muted small mb-0">Cheaper prices than your local supermarket, great cashback offers to top it off. Get best prices & offers.</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="px-3">
              <i className="bi bi-box text-success fs-1 mb-3"></i>
              <h5 className="fw-semibold mb-2">Wide Assortment</h5>
              <p className="text-muted small mb-0">Choose from 5000+ products across food, personal care, household, bakery, veg, non-veg & more.</p>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 mb-4">
            <div className="px-3">
              <i className="bi bi-arrow-counterclockwise text-success fs-1 mb-3"></i>
              <h5 className="fw-semibold mb-2">Easy Returns</h5>
              <p className="text-muted small mb-0">Not satisfied with a product? Return it at the doorstep & get a refund within hours. No questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
