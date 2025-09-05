import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UpdateProduct() {
  const { register, handleSubmit } = useForm();
  const { productId } = useParams();
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const navigateTo = useNavigate();
  const [product, setProduct] = useState(null);
  const [updated, setUpdated] = useState(false);

  const getProductById = async () => {
    const response = await fetch(`http://localhost:8080/products/${productId}`);
    const responseObject = await response.json();
    setProduct(responseObject.data);
  };
  useEffect(() => {getProductById()}, [updated, productId]);

  const collectFormData = async (formData) => {
    const response = await fetch(`http://localhost:8080/products/update/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const responseData = await response.json();
    console.log(responseData)
    setUpdated(true);
    Swal.fire({
      icon: 'success',
      title: 'Product Updated Successfully',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    });
    navigateTo(`/admin/manage-products/view/${categoryId}`);
  };

  return (
    <div>
      {product && (
        <div className="mt-3 d-flex flex-column align-items-center">
          <h3>Update Product</h3>
          <form className="w-50 mt-3" onSubmit={handleSubmit(collectFormData)}>
            <div className="mb-3">
              <input type="text" className="form-control" defaultValue={product.title} {...register("title", { required: true })} placeholder="Product Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" defaultValue={product.imageUrl} {...register("imageUrl", { required: true })} placeholder="Image URL" />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" defaultValue={product.price} {...register("price", { required: true })} placeholder="Price" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" defaultValue={product.unit} {...register("unit", { required: true })} placeholder="Unit (kg, litre, etc.)" />
            </div>
            <div className="mb-3">
              <input type="number" className="form-control" defaultValue={product.stock} {...register("stock", { required: true })} placeholder="Available Quantity" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" rows={3} defaultValue={product.description} {...register("description", { required: true })} placeholder="Description" />
            </div>
            <button className="btn btn-success w-100">Update Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
