import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AddCategory() {
  const { register, handleSubmit, formState } = useForm()
  const navigateTo = useNavigate()

  const collectFormData = async (formData) => {
    const response = await fetch("http://localhost:8080/categories/add", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    const responseData = await response.json()
    console.log(responseData)
    Swal.fire({
      icon: 'success',
      title: responseData.message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    });
    navigateTo("/admin/manage-categories")
  }
  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-lg-2 d-none d-lg-block"></div>
        <div className="col-lg-10 p-4">
          <button className="btn btn-success d-lg-none mb-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">Menu</button>
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Add New Category</h3>
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
                  <label className="form-label">Category Name</label>
                  <input type="text" className="form-control" placeholder="e.g. Vegetable" {...register("name", { required: true, minLength: 3, maxLength: 18 })} />
                  <div className="form-text text-danger">
                    {formState.errors?.name?.type === "required" && "Please enter product name"}
                    {formState.errors?.name?.type === "minLength" && "Minimum 3 characters"}
                    {formState.errors?.name?.type === "maxLength" && "Maximum 15 characters"}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success px-5">Add Category</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
