import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AddProduct() {
  const { register, handleSubmit, formState } = useForm()
  const navigateTo = useNavigate()
  const {categoryId} = useParams()

  const collectFormData = async (formData) => {
    const response = await fetch(`http://localhost:8080/category/${categoryId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const responseData = await response.json()
    console.log(responseData)
    Swal.fire({
      icon: 'success',
      title: "Product Added Successfully",
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    });
    navigateTo(`/admin/manage-products/view/${categoryId}`)
  }
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-lg-2 d-none d-lg-block"></div>
        <div className="col-lg-10 p-4">
          <button className="btn btn-success d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">Menu</button>
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit(collectFormData)}>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Image URL</label>
                  <input type="text" className="form-control" placeholder="Paste image URL" {...register("imageUrl", { required: "Image URL required" })} />
                  <div className="form-text text-danger">
                    {formState.errors.imageUrl?.message}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Product Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Fresh Tomatoes" {...register("title", { required: true, minLength: 3, maxLength: 15 })} />
                  <div className="form-text text-danger">
                    {formState.errors?.title?.type === "required" && "Please enter product name"}
                    {formState.errors?.title?.type === "minLength" && "Minimum 3 characters"}
                    {formState.errors?.title?.type === "maxLength" && "Maximum 15 characters"}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Price (₹)</label>
                  <input type="text" className="form-control" placeholder="e.g. 40" {...register("price", {required: "Price is required",  pattern: { value: /^[0-9]+$/, message: "Price must be a number" }})} />
                  <div className="form-text text-danger">
                    {formState.errors.price?.message}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Unit</label>
                  <select className="form-select" defaultValue="" {...register("unit", { required: "Please select a unit" })}>
                    <option disabled>Select Unit</option>
                    <option>kg</option>
                    <option>grams</option>
                    <option>dozen</option>
                    <option>piece</option>
                    <option>litre</option>
                    <option>ml</option>
                  </select>
                  <div className="form-text text-danger">
                    {formState.errors.unit?.message}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Available Quantity</label>
                  <input type="text" className="form-control" placeholder="e.g. 50" {...register("stock", {required: "Quantity is required", pattern: { value: /^[0-9]+$/, message: "Quantity must be a number" }})} />
                  <div className="form-text text-danger">
                    {formState.errors.stock?.message}
                  </div>
                </div>
              </div>
              <div className='row mb-3'>
              <div className="col-md-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Write a short description..." {...register("description", { required: "Description is required", minLength: { value: 10, message: "At least 10 characters required" }})}/>
                  <div className="form-text text-danger">
                    {formState.errors.description?.message}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success px-5">Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
