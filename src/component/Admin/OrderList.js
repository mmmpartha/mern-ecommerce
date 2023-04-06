import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import NavHeader from "./NavHeader";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);


  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <main class="main-wrap">
          <NavHeader />
          <section class="content-main">
            <div class="content-header">
              <div>
                <h2 class="content-title card-title">Order List </h2>
                <p>Inventory Order List.</p>
              </div>
              <div>
                <input type="text" placeholder="Search order ID" class="form-control bg-white" />
              </div>
            </div>
            <div class="card mb-4">
              <header class="card-header">
                <div class="row gx-3">
                  <div class="col-lg-4 col-md-6 me-auto">
                    <input type="text" placeholder="Search..." class="form-control" />
                  </div>
                  <div class="col-lg-2 col-6 col-md-3">
                    <select class="form-select">
                      <option>Status</option>
                      <option>Active</option>
                      <option>Disabled</option>
                      <option>Show all</option>
                    </select>
                  </div>
                  <div class="col-lg-2 col-6 col-md-3">
                    <select class="form-select">
                      <option>Show 20</option>
                      <option>Show 30</option>
                      <option>Show 40</option>
                    </select>
                  </div>
                </div>
              </header>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Product</th>
                        <th scope="col">Total</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Order Items</th>
                        <th scope="col" class="text-end"> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders &&
                        orders.map((item) => {
                          return (
                            <tr>
                              <td>{item._id}</td>
                              <td><b>{item.user}</b></td>
                              {item.orderItems.map((el) => {
                                return (
                                  <td><b>{el.name}</b></td>
                                )
                              })}
                              <td>{item.totalPrice}</td>
                              <td><span class="badge rounded-pill alert-warning">{item.orderStatus}</span></td>
                              <td>{item.orderItems.length}</td>
                              <td class="text-end">
                                <div class="col-lg-2 col-sm-2 col-4 col-action text-end">
                                  <Link to={`/admin/order/${item._id}`} class="btn btn-sm font-sm rounded btn-brand">
                                    <i class="material-icons md-edit"></i> Edit
                                  </Link>
                                  <Link onClick={() => deleteOrderHandler(item._id)} class="btn btn-sm font-sm btn-light rounded">
                                    <i class="material-icons md-delete_forever"></i> Delete
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default OrderList;
