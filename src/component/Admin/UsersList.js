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
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import NavHeader from "./NavHeader";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <main class="main-wrap">
          <NavHeader />
          <section class="content-main">
            <div class="content-header">
              <h2 class="content-title">User Details  </h2>
              <div>
                <a href="#" class="btn btn-primary"><i class="material-icons md-plus"></i> Create new</a>
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
                      <option>Show 20</option>
                      <option>Show 30</option>
                      <option>Show 40</option>
                      <option>Show all</option>
                    </select>
                  </div>
                  <div class="col-lg-2 col-6 col-md-3">
                    <select class="form-select">
                      <option>Status: all</option>
                      <option>Active only</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                </div>
              </header>
              <div class="card-body">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                  {
                    users &&
                    users.map((item) => {
                      return (
                        <div class="col">
                          <div class="card card-user">
                            <div class="card-header">
                              <img class="img-md img-avatar" src={item.avatar.url} alt="User pic" />
                            </div>
                            <div class="card-body">
                              <h5 class="card-title mt-50">{item.name}</h5>
                              <div class="card-text text-muted">
                                <p class="m-0">{item.role}</p>
                                <p>{item.email}</p>
                                <div class="d-flex  justify-content-center" >
                                  <Link to={`/admin/user/${item._id}`} class="btn btn-sm btn-brand rounded font-sm mt-15">
                                    Edit
                                  </Link>
                                  <Link onClick={() =>
                                    deleteUserHandler(item._id)
                                  } class="btn btn-sm btn-brand rounded font-sm mt-15">
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )

                    })
                  }
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  );
};

export default UsersList;
