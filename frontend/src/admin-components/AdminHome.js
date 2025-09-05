import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminHome.css';

export default function AdminHome() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8080/categories/all');
      const responseObject = await response.json();
      setCategories(responseObject.data);
    };

    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/products/all');
      const responseObject = await response.json();
      setProducts(responseObject.data);
    };

    const fetchOrders = async () => {
      const response = await fetch('http://localhost:8080/orders/all');
      const responseObject = await response.json();
      setOrders(responseObject.data);
    };

    fetchCategories().then(() => {
      fetchProducts();
      fetchOrders();
    });
  }, []);

  const getProductCount = (categoryId) => {
    return products.filter(p => p.category?.id === categoryId).length;
  };

  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="d-none d-lg-block" style={{ width: 250 }}></div>
        <div className="col">
          <button className="btn btn-dark d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas">
            <i className="bi bi-list"></i> Menu
          </button>
          <h2 className="fw-bold mb-4"> Dashboard</h2>
          <div className="row g-4">
            <div className="col-md-4 col-lg-4">
              <div className="card bg-dark text-white shadow rounded-4">
                <div className="card-body">
                  <h5>Total Products</h5>
                  <p className="display-6 fw-semibold">{products.length}</p>
                  <Link to="/admin/manage-products/view/all" className="btn btn-primary btn-sm">View Products</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <div className="card bg-dark text-white shadow rounded-4">
                <div className="card-body">
                  <h5>Total Categories</h5>
                  <p className="display-6 fw-semibold">{categories.length}</p>
                  <Link to="/admin/manage-categories" className="btn btn-success btn-sm">Manage Categories</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-4">
              <div className="card bg-dark text-white shadow rounded-4">
                <div className="card-body">
                  <h5>Total Orders</h5>
                  <p className="display-6 fw-semibold">{orders.length}</p>
                  <Link to="/admin/manage-orderlist" className="btn btn-warning btn-sm">Manage Orders</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <div className="card bg-dark text-white shadow rounded-4">
                <div className="card-body">
                  <h5 className="mb-4"><i className="bi bi-tag"></i> Top Categories</h5>
                  <ul className="list-group list-group-flush">
                    {categories.map((category) => (
                      <li className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center" key={category.id}>
                        {category.name}
                        <span className="badge bg-primary rounded-pill">{getProductCount(category.id)} products</span>
                      </li>
                    ))}
                    {categories.length === 0 && (
                      <li className="list-group-item text-muted">No categories available</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card shadow rounded-4 overflow-hidden">
                <div className="card-body bg-dark text-white">
                  <h5 className="mb-3"><i className="bi bi-calendar3 me-2"></i>Calendar</h5>
                  <Calendar className="custom-calendar rounded-4 p-3" onChange={onChange} value={value} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
