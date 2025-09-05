import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ManageProducts() {
  const [products, setProducts] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('all');
  const [selectedPriceSort, setSelectedPriceSort] = useState('');
  const { categoryId } = useParams();

  const getAllCategories = async () => {
    const response = await fetch("http://localhost:8080/categories/all");
    const responseObject = await response.json();
    setCategories(responseObject.data);
  };
  const getAllProducts = async () => {
    let url = categoryId === 'all' ? "http://localhost:8080/products/all" : `http://localhost:8080/products/categories/${categoryId}`;
    const response = await fetch(url);
    const responseObject = await response.json();
    let filtered = responseObject.data;
    if (selectedCategoryName !== 'all') {
      filtered = filtered.filter(p => p.category?.name === selectedCategoryName);
    }
    if (selectedPriceSort === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedPriceSort === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setProducts(filtered);
  };
  useEffect(() => {getAllProducts().then(()=>{getAllCategories()})}, [isDeleted, categoryId]);

  const deleteProduct = async (productId) => {
    let response = await fetch(`http://localhost:8080/products/delete/${productId}`, { method: 'delete' });
    let responseData = await response.json()
    setIsDeleted(true);
    Swal.fire({
      icon: 'success',
      title: responseData.message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="d-flex">
      <div className="d-none d-lg-block" style={{ width: 250 }}></div>
      <div className="flex-grow-1 p-4">
        <button className="btn btn-dark d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas">
          <i className="bi bi-list"></i> Menu
        </button>
        <div className="card shadow rounded-4 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">All Products</h3>
            {categoryId === "all" ? (
              <button className="btn btn-dark" data-bs-toggle="offcanvas" data-bs-target="#filterOffcanvas"><i className="bi bi-funnel-fill"></i> Filter</button>
            ) : (
              <Link className="btn btn-dark px-3" to={`/admin/manage-products/add/${categoryId}`}><i className="bi bi-plus-lg me-1"></i>Add Product</Link>
            )}
          </div>
          <div className="rounded-4 overflow-hidden border">
            <table className="table align-middle text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Quantity (kg)</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.imageUrl} width="50" height="50" className="rounded" alt={product.title} /></td>
                    <td>{product.title}</td>
                    <td>{product.category?.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link className="btn btn-outline-warning btn-sm" to={`/admin/update/product/${product.id}`} state={{categoryId}}>Edit</Link>
                    </td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(product.id)}>DELETE</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="filterOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filter Products</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Category</label>
            <select className="form-select" value={selectedCategoryName} onChange={(e) => setSelectedCategoryName(e.target.value)} >
              <option value="all">All</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Sort by Price</label>
            <div>
              <div className="form-check">
                <input type="radio" id="asc" name="priceSort" className="form-check-input" value="asc" checked={selectedPriceSort === 'asc'} onChange={(e) => setSelectedPriceSort(e.target.value)} />
                <label className="form-check-label" htmlFor="asc">Low to High</label>
              </div>
              <div className="form-check">
                <input type="radio" id="desc" name="priceSort" className="form-check-input" value="desc" checked={selectedPriceSort === 'desc'} onChange={(e) => setSelectedPriceSort(e.target.value)} />
                <label className="form-check-label" htmlFor="desc">High to Low</label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-secondary" onClick={() => { 
              setSelectedCategoryName('all'); 
              setSelectedPriceSort(''); 
              getAllProducts(); 
              }}>Reset</button>
            <button className="btn btn-success" onClick={() => {
              getAllProducts();
              document.querySelector("#filterOffcanvas .btn-close").click();
            }}> Apply Filters </button>
          </div>
        </div>
      </div>
    </div>
  );
}
