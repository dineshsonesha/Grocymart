import React, { useEffect, useState } from 'react'
import CustomerNavbar from './CustomerNavbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer';
import Cart from './Cart';
import RestoreScrollFix from '../account-components/RestoreScrollFix';

export default function CustomerDashboard() {
  const [products, setProducts] = useState(null);
  const [filterProducts, setFilterProducts] = useState(null);
  const [categoryWiseProduct, setCategoryWiseProduct] = useState(null);

  const getAllByProducts = async () => {
    let response = await fetch("http://localhost:8080/products/all", { method: "get" });
    let responseObject = await response.json();
    setProducts(responseObject.data);
    setFilterProducts(responseObject.data);
    setCategoryWiseProduct(responseObject.data);
  }
  useEffect(() => { getAllByProducts() }, [])

  const filterProductByCategory = (categoryName) => {
    if (categoryName === 'all') {
      setFilterProducts(products);
      setCategoryWiseProduct(products);
    } else {
      const newProducts = products.filter(product =>
        product.category.name.toLowerCase().includes(categoryName.toLowerCase())
      );
      setFilterProducts(newProducts);
    }
  }
  const sortProductsByPrice = (flag) => {
    let sorted = [...filterProducts];
    if (flag === 'asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilterProducts(sorted);
  }
  const searchProductsByTitle = (title) => {
    const newProducts = categoryWiseProduct.filter(product =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilterProducts(newProducts);
  }

  return (
    <div className="container">
      <RestoreScrollFix />
      <CustomerNavbar onFilterProductByCategory={filterProductByCategory} onSearchProductsByTitle={searchProductsByTitle} />
      <Outlet context={{ products, filterProducts, sortProductsByPrice, searchProductsByTitle, filterProductByCategory }} />
      <Footer onFilterProductByCategory={filterProductByCategory} />
      <Cart />
    </div>
  )
}
