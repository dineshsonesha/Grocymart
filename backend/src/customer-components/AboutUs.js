import React from 'react'

export default function AboutUs() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">About GrocyMart</h2>
        <p className="text-muted">
          Your trusted online grocery partner, delivering freshness at your doorstep.
        </p>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={"/images/aboutus.png"}
            className="img-fluid rounded"
            alt="About GrocyMart"
          />
        </div>
        <div className="col-md-6">
          <h4 className="fw-semibold">Who We Are</h4>
          <p className="text-muted">
            GrocyMart is a modern online grocery store offering a wide range of fresh produce, household items,
            and daily essentials. We are committed to delivering top-quality products with convenience and care.
          </p>

          <h4 className="fw-semibold mt-4">Why Choose Us?</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">✅ Fast & Reliable Delivery</li>
            <li className="list-group-item">✅ Quality-Checked Products</li>
            <li className="list-group-item">✅ Secure Online Payments</li>
            <li className="list-group-item">✅ Friendly Customer Support</li>
          </ul>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <h5 className="fw-bold">5000+</h5>
          <p className="text-muted">Happy Customers</p>
        </div>
        <div className="col-md-4 text-center">
          <h5 className="fw-bold">10,000+</h5>
          <p className="text-muted">Orders Delivered</p>
        </div>
        <div className="col-md-4 text-center">
          <h5 className="fw-bold">100%</h5>
          <p className="text-muted">Customer Satisfaction</p>
        </div>
      </div>
    </div>
  )
}
