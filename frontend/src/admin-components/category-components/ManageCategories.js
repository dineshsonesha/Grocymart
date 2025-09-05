import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ManageCategories() {
  let [categories, setCategories] = useState(null)
  let [products, setProducts] = useState(null)
  let [isDeleted, setIsDeleted] = useState(false)

  let getAllByCategories = async () => {
    let response = await fetch("http://localhost:8080/categories/all", { method: "get" })
    let responseObject = await response.json()
    setCategories(responseObject.data)
  }
  const getAllProducts = async () => {
    const response = await fetch("http://localhost:8080/products/all")
    const responseObject = await response.json()
    setProducts(responseObject.data)
  }
  useEffect(() => { getAllProducts().then(() => { getAllByCategories() }) }, [isDeleted,categories])

  const deleteCategory = async (categoryId) => {
    let response = await fetch(`http://localhost:8080/categories/delete/${categoryId}`, { method: 'delete' })
    let responseData = await response.json()
    setIsDeleted(true)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: responseData.message,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
  }

  const getProductCount = (categoryId) => {
    return products.filter(product => product.category?.id === categoryId).length
  }

  return (
    <div className="d-flex">
      <div className="d-none d-lg-block" style={{ width: 250 }}></div>

      <div className="flex-grow-1 p-4">
        <button className="btn btn-dark d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas"><i className="bi bi-list"></i> Menu</button>

        <div className="card shadow rounded-4 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">All Categories</h3>
            <Link className='btn btn-dark' to={'/admin/manage-category/add'}><i className="bi bi-plus-lg me-1"></i>Add Category</Link>
          </div>

          <div className="table-responsive">
            <div className="border rounded-4 shadow-sm overflow-hidden">
              <table className="table table-bordered align-middle text-center mb-0 text-capitalize">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Category Name</th>
                    <th>Total Products</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td><img src={category.imageUrl} width="50" height="50" className="rounded-circle border" alt={category.name} /></td>
                      <td>{category.name}</td>
                      <td>{getProductCount(category.id)}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                          <Link className="btn btn-primary btn-sm px-3" title="View Category"  to={`/admin/manage-products/view/${category.id}`}><i class="bi bi-eye"></i></Link>
                          <button className="btn btn-danger btn-sm px-3" title="Delete Category" onClick={() => deleteCategory(category.id)}><i className="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}