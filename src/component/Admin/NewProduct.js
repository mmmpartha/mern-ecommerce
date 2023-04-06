import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import NavHeader from "./NavHeader";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <main class="main-wrap">
          <NavHeader />
          <section class="content-main">
            <div class="row">
              <div class="col-9">
                <div class="content-header">
                  <h2 class="content-title">Add New Product</h2>
                  <div>
                    <button class="btn btn-md rounded font-sm hover-up"
                      type="submit"
                      disabled={loading ? true : false}
                      encType="multipart/form-data"
                      onClick={createProductSubmitHandler}>Publich</button>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card mb-4">
                  <div class="card-header">
                    <h4>Create</h4>
                  </div>
                  <div class="card-body">
                    <form>
                      <div class="mb-4">
                        <label for="product_name" class="form-label">Product title</label>
                        <input type="text"
                          placeholder="Product Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          class="form-control" id="product_name" />
                      </div>
                      <div class="mb-4">
                        <label class="form-label">Full description</label>
                        <textarea placeholder="Product Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          cols="30"
                          class="form-control" rows="4"></textarea>
                      </div>
                      <div class="row">
                        <div class="col-lg-4">
                          <div class="mb-4">
                            <label class="form-label">Regular price</label>
                            <div class="row gx-2">
                              <input type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="mb-4">
                            <label class="form-label">Stock</label>
                            <input type="number"
                              placeholder="Stock"
                              required
                              onChange={(e) => setStock(e.target.value)} class="form-control" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="card mb-4">
                  <div class="card-header">
                    <h4>Media</h4>
                  </div>
                  <div class="card-body">
                    <div class="input-upload">
                      {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                      ))}
                      <input class="form-control" type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple />
                    </div>
                  </div>
                </div>
                <div class="card mb-4">
                  <div class="card-header">
                    <h4>Categories</h4>
                  </div>
                  <div class="card-body">
                    <div class="row gx-2">
                      <div class="col-sm-6 mb-3">
                        <label class="form-label">Category</label>
                        <select class="form-select" onChange={(e) => setCategory(e.target.value)}>
                          <option value="">Choose Category</option>
                          {categories.map((cate) => (
                            <option key={cate} value={cate}>
                              {cate}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default NewProduct;
