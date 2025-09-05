import React from 'react'

export default function Contact() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Get in Touch</h2>
        <p className="text-muted">Have questions or need help? Reach out — we're here for you!</p>
      </div>
      <div className="row text-center mb-5">
        <div className="col-md-4">
          <div className="card border shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-telephone-fill fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Call Us</h6>
              <p className="text-muted mb-0">+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
          <div className="card border shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-envelope-fill fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Email</h6>
              <p className="text-muted mb-0">support@grocymart.com</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-4 mt-md-0">
          <div className="card border shadow-sm h-100">
            <div className="card-body">
              <i className="bi bi-geo-alt-fill fs-2 text-success mb-3"></i>
              <h6 className="fw-bold">Visit Us</h6>
              <p className="text-muted mb-0">123 Market Street, Thane</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border">
            <div className="card-body p-4">
              <h5 className="card-title mb-4">Send Us a Message</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Your message..." />
                </div>
                <button type="submit" className="btn btn-success w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
