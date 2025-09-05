import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {
  let [categories,setCategories] = useState(null)

  let getAllByCategories = async () => {
    let response = await fetch("http://localhost:8080/categories/all",{method:"get"})
    let responseObject = await response.json()
    setCategories(responseObject.data)
  }
  useEffect(()=>{getAllByCategories()}, [])

  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="fw-bold">GrocyMart</h5>
            <p className="text-muted">India’s trusted online grocery platform. Shop fresh fruits, vegetables, dairy, and more with doorstep delivery.</p>
            <div className="d-flex gap-3 mt-3">
              <Link to={"/"} className="text-muted"><i className="bi bi-facebook fs-5"></i></Link>
              <Link to={"/"} className="text-muted"><i className="bi bi-instagram fs-5"></i></Link>
              <Link to={"/"} className="text-muted"><i className="bi bi-twitter fs-5"></i></Link>
              <Link to={"/"} className="text-muted"><i className="bi bi-youtube fs-5"></i></Link>
            </div>
          </div>
          <div className="col-md-2">
            <h6 className="fw-semibold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to={"/"} className="text-muted text-decoration-none">Home</Link></li>
              <li><Link to={"/products/all"} className="text-muted text-decoration-none">Product</Link></li>
              <li><Link to={"/aboutus"} className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link to={"/contact"} className="text-muted text-decoration-none">Contact Us</Link></li>
              <li><Link to={"/orders"} className="text-muted text-decoration-none">My Order</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Top Categories</h6>
            <ul className="list-unstyled">
              {categories && categories.map(category =>{
                return(
                <li key={category.id}><Link className="text-muted text-decoration-none" to={`/products/${category.id}`} onClick={() => {props.onFilterProductByCategory(category.name)}}>{category.name}</Link></li>
                )
              })}
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="fw-semibold">Customer Support</h6>
            <p className="text-muted mb-1"><i className="bi bi-telephone-fill me-2"></i>+91 98765 43210</p>
            <p className="text-muted mb-1"><i className="bi bi-envelope-fill me-2"></i>support@grocymart.com</p>
            <p className="text-muted"><i className="bi bi-geo-alt-fill me-2"></i>Thane, Maharashtra</p>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 text-muted">
            &copy; 2025 GrocyMart. All rights reserved.
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" width="50" alt="Visa" className="me-2" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" width="50" alt="Mastercard" className="me-2" />
            <img src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2021/11/1280px-Rupay-Logo.png" width="50" alt="RuPay" />
          </div>
        </div>
      </div>
    </footer>
  )
}
