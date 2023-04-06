import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import NavHeader from "./NavHeader";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
      <main class="main-wrap">
        <NavHeader />
        <section class="content-main">
          <div class="content-header">
            <div>
              <h2 class="content-title card-title">Dashboard </h2>
              <p>Whole data about your business here</p>
            </div>
            <div>
              <Link to="/admin/product" class="btn btn-primary"><i class="text-muted material-icons md-post_add"></i>Create
                Product</Link>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3">
              <div class="card card-body mb-4">
                <article class="icontext">
                  <span class="icon icon-sm rounded-circle bg-primary-light"><i
                    class="text-primary material-icons md-monetization_on"></i></span>
                  <div class="text">
                    <h6 class="mb-1 card-title">Revenue</h6>
                    <span>₹{totalAmount}</span>
                    <span class="text-sm">
                      Shipping fees are not included
                    </span>
                  </div>
                </article>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card card-body mb-4">
                <article class="icontext">
                  <span class="icon icon-sm rounded-circle bg-success-light">
                    <Link to="/admin/orders">
                      <i class="text-success material-icons md-local_shipping"></i>
                    </Link>
                  </span>
                  <div class="text">
                    <Link to="/admin/orders">
                      <h6 class="mb-1 card-title">Orders</h6>
                      <span>{orders && orders.length}</span>
                    </Link>
                    <span class="text-sm">
                      Excluding orders in transit
                    </span>
                  </div>
                </article>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card card-body mb-4">
                <article class="icontext">
                  <span class="icon icon-sm rounded-circle bg-warning-light"><Link to="/admin/products"><i
                    class="text-warning material-icons md-qr_code"></i></Link></span>
                  <div class="text">
                    <Link to="/admin/products">
                      <h6 class="mb-1 card-title">Product</h6>
                      <span>{products && products.length}</span>
                    </Link>
                    <span class="text-sm">
                      In 19 Categories
                    </span>
                  </div>
                </article>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card card-body mb-4">
                <article class="icontext">
                  <span class="icon icon-sm rounded-circle bg-info-light">
                    <Link to="/admin/users">
                      <i class="fa-light fa-users"></i>
                    </Link>
                  </span>
                  <div class="text">
                    <Link to="/admin/users">
                      <h6 class="mb-1 card-title">Users</h6>
                      <span>{users && users.length}</span>
                    </Link>
                    <span class="text-sm">
                      Including Admin.
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-8 col-lg-12">
              <div class="card mb-4">
                <article class="card-body">
                  <h5 class="card-title">Sale statistics</h5>
                  <Line data={lineState} />
                </article>
              </div>
            </div>
            <div class="col-xl-4 col-lg-12">
              <div class="card mb-4">
                <article class="card-body">
                  <h5 class="card-title">Revenue Base on Area</h5>
                  <Doughnut data={doughnutState} />
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
