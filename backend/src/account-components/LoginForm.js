import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../UserContext';

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const onLogin = async (formData) => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const responseObject = await response.json();

    if (response.ok) {
      login(responseObject.data);
      Swal.fire({
        icon: 'success',
        title: responseObject.message || 'Login successful',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } else {
      Swal.fire({
        icon: 'error',
        title: responseObject.message || 'Login failed',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 p-md-5 shadow w-100" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-3 fw-bold">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Login to GrocyMart</p>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" {...register("email", { required: "Email required" })} />
            <div className="form-text text-danger">{formState.errors.email?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" {...register("password", { required: "Password required" })} />
            <div className="form-text text-danger">{formState.errors.password?.message}</div>
          </div>
          <button type="submit" className="btn btn-success w-100 fw-bold mb-2">Login</button>
        </form>
        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account?</span>
          <button className="btn btn-link p-0 ms-1 text-success fw-semibold" onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>
    </div>
  );
}
