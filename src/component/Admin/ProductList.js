import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import NavHeader from "./NavHeader";

const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />

        <main class="main-wrap">
          <NavHeader />
          <section class="content-main">
            <div class="content-header">
              <div>
                <h2 class="content-title card-title">Products List</h2>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div>
                <Link to="/admin/product" class="btn btn-primary btn-sm rounded">Create new</Link>
              </div>
            </div>
            <div class="card mb-4">
              <header class="card-header">
                <div class="row align-items-center">
                  <div class="col-md-3 col-3 me-auto mb-md-0 mb-3">
                    <select class="form-select">
                      <option selected>All category</option>
                      <option>Electronics</option>
                      <option>Clothes</option>
                      <option>Automobile</option>
                    </select>
                  </div>
                  <div class="col-md-3 col-3 me-auto mb-md-0 mb-3">
                    <p>Price</p>
                  </div>
                  <div class="col-md-2 col-2">
                    <p>Stock</p>
                  </div>
                  <div class="col-md-2 col-2">
                    <p>Categories</p>
                  </div>
                  <div class="col-md-2 col-2">
                    <p>Edit/Delete</p>
                  </div>
                </div>
              </header>
              <div class="card-body">
                {
                  products &&
                  products.map((item) => {
                    console.log("page", item);
                    return (
                      <>
                        <article class="itemlist">
                          <div class="row align-items-center">
                            <div class="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                              <a class="itemside" href="#">
                                <div class="left">
                                  <img src={item.images[0].url} class="img-sm img-thumbnail" alt={item.name} />
                                </div>
                                <div class="info">
                                  <h6 class="mb-0">{item.name}</h6>
                                </div>
                              </a>
                            </div>
                            <div class="col-lg-2 col-sm-2 col-4 col-price"> <span>{item.price}</span></div>
                            <div class="col-lg-2 col-sm-2 col-4 col-status">
                              <span class="badge rounded-pill alert-success">{item.Stock}</span>
                            </div>
                            <div class="col-lg-1 col-sm-2 col-4 col-date">
                              <span>{item.category}</span>
                            </div>
                            <div class="col-lg-2 col-sm-2 col-4 col-action text-end">
                              <Link to={`/admin/product/${item._id}`} class="btn btn-sm font-sm rounded btn-brand">
                                <i class="material-icons md-edit"></i> Edit
                              </Link>
                              <Link onClick={() => deleteProductHandler(item._id)} class="btn btn-sm font-sm btn-light rounded">
                                <i class="material-icons md-delete_forever"></i> Delete
                              </Link>
                            </div>
                          </div>
                        </article>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default ProductList;
