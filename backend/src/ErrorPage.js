import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light text-center">
      <div>
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3"> <span className="text-danger">Oops!</span> Page not found.</p>
        <p className="lead">
          The page you’re looking for doesn’t exist or you don’t have permission.
        </p>
        <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
      </div>
    </div>
  );
}
