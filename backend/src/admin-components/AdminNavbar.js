import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminNavbar() {
    return (
        <nav>
            <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-center w-100 fs-4 fw-bold"><i className="bi bi-bar-chart-fill me-2 text-white"></i>Admin Panel</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column justify-content-between">
                    <div className="list-group list-group-flush">
                        <Link to={"/admin"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-speedometer2 me-2"></i>Dashboard</Link>
                        <Link to={"/admin/manage-categories"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-plus-circle me-2"></i>Manage Categories</Link>
                        <Link to={"/admin/manage-products/view/all"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-box-seam me-2"></i>Product List</Link>
                        <Link to={"/admin/manage-orderlist"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-cart me-2"></i>Order List</Link>
                    </div>
                    <div>
                        <hr className="border-light" />
                        <Link to={""} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3 px-3 d-flex align-items-center"><i className="bi bi-person me-2"></i> <span>Account</span></Link>
                    </div>
                </div>
            </div>
            <div className="d-none d-lg-block bg-dark text-white vh-100 position-fixed" style={{ width: 250, top: 0, left: 0 }}>
                <div className="d-flex flex-column h-100">
                    <div className="text-center py-4 fs-4 fw-bold"><i className="bi bi-bar-chart-fill me-2 text-white"></i>Admin Panel</div>
                    <div className="list-group list-group-flush flex-grow-1">
                        <Link to={"/admin"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-speedometer2 me-2"></i>Dashboard</Link>
                        <Link to={"/admin/manage-categories"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-plus-circle me-2"></i>Manage Categories</Link>
                        <Link to={"/admin/manage-products/view/all"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-box-seam me-2"></i>Product List</Link>
                        <Link to={"/admin/manage-orderlist"} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3"><i className="bi bi-cart me-2"></i>Order List</Link>
                    </div>
                    <div className="mt-auto">
                        <hr className="border-light" />
                        <Link to={""} className="list-group-item list-group-item-action bg-dark text-light border-0 py-3 px-3 d-flex align-items-center"><i className="bi bi-person me-2"></i> <span>Account</span></Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
