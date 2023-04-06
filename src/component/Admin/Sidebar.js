import React from "react";
import "./assets/css/main.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="navbar-aside" id="offcanvas_aside">
      <div class="screen-overlay"></div>
      <aside class="navbar-aside" id="offcanvas_aside">
        <div class="aside-top">
          <Link to="/admin/dashboard" class="brand-wrap">
            <img src={logo} class="logo" alt="Digitan_backend" />
          </Link>
        </div>
        <nav>
          <ul class="menu-aside">
            <li class="menu-item active">
              <Link to="/admin/dashboard" class="menu-link">
                <i class="icon material-icons md-home"></i>
                <span class="text">Dashboard</span>
              </Link>
            </li>
            <li class="menu-item has-submenu">
              <Link to="/admin/products" class="menu-link">
                <i class="icon material-icons md-shopping_bag"></i>
                <span class="text">Products</span>
              </Link>
            </li>
            <li class="menu-item has-submenu">
              <Link to="/admin/orders" class="menu-link">
                <i class="icon material-icons md-shopping_cart"></i>
                <span class="text">Orders</span>
              </Link>
              <div class="submenu">
                <a href="page-orders-1.html">Order list 1</a>
                <a href="page-orders-2.html">Order list 2</a>
                <a href="page-orders-detail.html">Order detail</a>
                <a href="page-orders-tracking.html">Order tracking</a>
                <a href="page-invoice.html">Invoice</a>
              </div>
            </li>
            <li class="menu-item has-submenu">
              <Link to="/admin/product" class="menu-link">
                <i class="icon material-icons md-add_box"></i>
                <span class="text">Add product</span>
              </Link>
            </li>
            <li class="menu-item has-submenu">
              <Link to="/admin/users" class="menu-link">
                <i class="icon material-icons md-person"></i>
                <span class="text">Account</span>
              </Link>
              <div class="submenu">
                <a href="page-account-login.html">User login</a>
                <a href="page-account-register.html">User registration</a>
                <a href="page-error-404.html">Error 404</a>
              </div>
            </li>
            <li class="menu-item">
              <Link to="/admin/reviews" class="menu-link">
                <i class="icon material-icons md-comment"></i>
                <span class="text">Reviews</span>
              </Link>
            </li>
          </ul>
          <ul class="menu-aside">
            <li class="menu-item">
              <Link to="/" class="menu-link">
                <i class="icon material-icons md-local_offer"></i>
                <span class="text"> Starter page </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
