import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './admin-components/Dashboard';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage.js';
import AdminHome from './admin-components/AdminHome.js';
import AddProduct from './admin-components/product-components/AddProduct.js';
import CustomerHome from './customer-components/CustomerHome.js';
import ManageProducts from './admin-components/product-components/ManageProducts.js';
import ProductDetail from './customer-components/product-display/ProductDetails.js';
import AddCategory from './admin-components/category-components/AddCategory.js';
import ManageCategories from './admin-components/category-components/ManageCategories.js';
import Products from './customer-components/Products.js';
import CustomerDashboard from './customer-components/CustomerDashboard.js';
import Cart from './customer-components/Cart.js';
import AboutUs from './customer-components/AboutUs.js';
import Contact from './customer-components/Contact.js';
import UpdateProduct from './admin-components/product-components/UpdateProduct.js';
import LoginForm from './account-components/LoginForm.js';
import RegisterForm from './account-components/RegisterForm.js';
import { UserProvider } from './UserContext.js';
import UserProfile from './customer-components/UserProfile.js';
import OrderHistory from './customer-components/OrderHistory.js';
import ManageOrderList from './admin-components/ManageOrderList.js';

let routes = createBrowserRouter([
  {
    path: "/admin",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminHome />
      },
      {
        path: "manage-categories",
        element: <ManageCategories />
      },
      {
        path: "manage-category/add",
        element: <AddCategory />
      },
      {
        path: "manage-products/add/:categoryId",
        element: <AddProduct />
      },
      {
        path: "manage-products/view/:categoryId",
        element: <ManageProducts />
      },
      {
        path: "update/product/:productId",
        element: <UpdateProduct/>
      },
      {
        path: "manage-orderlist",
        element: <ManageOrderList />
      }
    ]
  },
  {
    path: "/",
    element: <CustomerDashboard />, 
    children: [
      {
        path:"/",
        element:<CustomerHome/>,
        index:true
      },
      {
        path: "products/:categoryId",
        element: <Products />
      },
      {
        path: "product/:productId",
        element:<ProductDetail/>
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/aboutus",
        element: <AboutUs/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/profile",
        element: <UserProfile />
      },
      {
        path:"/orders",
        element: <OrderHistory/>
      }
    ]
  },
  {
    path:"/login",
    element:<LoginForm/>
  },
  {
    path:"/register",
    element:<RegisterForm/>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <RouterProvider router={routes} />
  </UserProvider>
);


