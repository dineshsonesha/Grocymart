import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const {register, handleSubmit, reset, formState: { errors }} = useForm();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser) {
      setUser(sessionUser);
      reset(sessionUser);
    }
  }, [reset]);

  const updateProfile = async (data) => {
    const response = await fetch(`http://localhost:8080/users/update/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Profile updated',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      setUser(responseData.data);
      sessionStorage.setItem("loggedUser", JSON.stringify(responseData.data));
      window.dispatchEvent(new Event("loggedUserUpdated"));
    } else {
      Swal.fire({
        toast: true,
        icon: 'error',
        title: responseData.message || 'Update failed',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" style={{ maxWidth: '600px', margin: 'auto', borderRadius: '15px' }} >
        <h4 className="mb-4 text-center">User Profile</h4>
        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" {...register("username", { required: "Username is required" })} /> 
            {errors.username && <small className="text-danger">{errors.username.message}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })} />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input className="form-control" {...register("address", { required: "Address is required" })} />
            {errors.address && <small className="text-danger">{errors.address.message}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input className="form-control" {...register("phoneNo", { required: "Phone number is required", pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit phone number" } })} />
            {errors.phoneNo && <small className="text-danger">{errors.phoneNo.message}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" {...register("password", { required: "Password is required", minLength: { value: 5, message: "Password must be at least 5 characters" } })} />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <button type="submit" className="btn btn-success w-100 mt-2"> Save Changes </button>
        </form>
      </div>
    </div>
  );
}
