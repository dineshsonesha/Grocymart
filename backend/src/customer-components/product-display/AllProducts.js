import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import Swal from 'sweetalert2';

export default function AllProducts(props) {
  const products = props.productsValue?.length ? props.productsValue : props.allProductsValue;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    if (!user) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        title: 'Please login to add items to cart',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1600,
      });
      navigate('/login');
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

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end mb-3">
        <div className="dropdown">
          <button className="btn btn-success fw-bold dropdown-toggle text-white" type="button" data-bs-toggle="dropdown">Sort</button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" onClick={() => props.onSortProductsByPrice('asc')}>Price: Low to High</Link></li>
            <li><Link className="dropdown-item" onClick={() => props.onSortProductsByPrice('desc')}>Price: High to Low</Link></li>
          </ul>
        </div>
      </div>
      <div className="row g-4">
        {products && products.map((product) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg" style={{ flex: '0 0 20%', maxWidth: '20%' }} key={product.id}>
            <div className="card h-100 shadow-sm position-relative">
              <span className="badge bg-success position-absolute top-0 end-0 m-2 text-uppercase">{product.category?.name}</span>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.imageUrl} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain' }} />
              </Link>
              <div className="card-body text-center">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h5 className="card-title">{product.title}</h5>
                </Link>
                <p className="card-text"> ₹{product.price}/{product.unit}</p>
                <button className="btn btn-success w-100" onClick={() => handleAddToCart(product.id)}> Add to Cart </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
