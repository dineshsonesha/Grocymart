import { useContext, useEffect, useState } from 'react'
import './CustomerNavbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';

export default function CustomerNavbar(props) {
  let [categories,setCategories] = useState(null)
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [cartCount, setCartCount] = useState(0);
  const {logout} = useContext(UserContext)

  const fetchCartCount = async () => {
    const storedUser = sessionStorage.getItem("loggedUser");
    if (!storedUser) {
      setCartCount(0);
      return;
    }
    const user = JSON.parse(storedUser);
    if (!user?.id) {
      setCartCount(0);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/cart/${user.id}`);
      const responseObject = await response.json();
      setCartCount(responseObject.data?.length || 0);
    } catch (error) {
      setCartCount(0);
    }
  };
  useEffect(() => {fetchCartCount()}, []);
  useEffect(() => {
    window.addEventListener("cartUpdated", fetchCartCount);
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, []);

  let getAllByCategories = async () => {
    let response = await fetch(`http://localhost:8080/categories/all`,{method:"get"})
    let responseObject = await response.json()
    setCategories(responseObject.data)
  }
  useEffect(()=>{getAllByCategories()}, [])

  const onSubmit = (data) => {
    if (props.onSearchProductsByTitle) {
      props.onSearchProductsByTitle(data.productName); 
      navigate(`/products/all?search=${data.productName.trim()}`);
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCartLogin = (event) => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user || !user.id) {
      event.preventDefault();
      Swal.fire({
        toast: true,
        icon: 'warning',
        title: 'Please login first!',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  return (
      <div className="sticky-top">
        <div className="container-fluid header-top py-3">
          <div className="row align-items-center">
            <div className="col-md-2 col-6">
              <Link className="navbar-brand fs-3">GrocyMart</Link>
            </div> 
            <div className="col-md-6 col-12 mt-2 mt-md-0">
              <form className="d-flex flex-grow-1 mx-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                  <input type="search" className="form-control border-success" placeholder="Search vegetables, fruits..." {...register("productName", { required: true })}/>
                  <button className="btn btn-success" type="submit"><i className="bi bi-search"></i></button>
                </div>
              </form>
            </div> 
            <div className="col-md-4 col-6 d-flex justify-content-end align-items-center">
              <div className="me-3 location-label d-flex align-items-center">
                <i className="bi bi-geo-alt me-1 text-success"></i><span className="fw-semibold text-dark">Mumbai</span>
              </div>
              <div className="d-flex position-relative gap-3">
                <Link className="icon-btn mx-2 position-relative" onClick={handleCartLogin} data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                  <i className="bi bi-cart3"></i>
                  <span className="cart-count">{cartCount}</span>
                </Link>
                <Link href="#" className="icon-btn" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders"><i className="bi bi-clipboard-check me-2"></i>My Orders</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item"><i className="bi bi-box-arrow-right me-2"></i>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> 
        <nav className="navbar navbar-expand-lg py-2">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle category-btn" data-bs-toggle="dropdown" aria-expanded="false">Categories</Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={"/products/all"} onClick={() => {props.onFilterProductByCategory('all')}}>All</Link></li>
                      {categories && categories.map(category =>{
                        return(
                        <li key={category.id}><Link className="dropdown-item" to={`/products/${category.id}`} onClick={() => {props.onFilterProductByCategory(category.name)}}>{category.name}</Link></li>
                        )
                      })}
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/products/all"}>Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/aboutus"}>About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/contact"}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
      </div>
  )
}
