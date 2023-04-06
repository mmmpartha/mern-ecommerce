import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import logo from "./images/assets/logo.png"



const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);


  const inputs = document.querySelectorAll(".input");


  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) :
        (
          <Fragment>
            <img className="loginlogo" src={logo} alt="loginlogo" />
            <h2 className="title">Welcome</h2>
            <div class="container">
              <div class="screen">
                <div class="screen__content">
                  <form class="login" onSubmit={loginSubmit}>
                    <div class="login__field">
                      <i class="login__icon fas fa-user"></i>
                      <input type="email" class="login__input" placeholder="User Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div class="login__field">
                      <i class="login__icon fas fa-lock"></i>
                      <input type="password" class="login__input" placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button class="button login__submit">
                      <span class="button__text">Log In Now</span>
                      <i class="button__icon fas fa-chevron-right"></i>
                    </button>
                  </form>
                  <Link to="/password/forgot" className="forgotpassword">ForgotPassword?</Link>
                  <div class="social-login">
                    <h3>Don't have a account?<Link to="/register" className="signup">Register</Link></h3>
                    <div class="social-icons">
                      <a href="#" class="social-login__icon fab fa-instagram"></a>
                      <a href="#" class="social-login__icon fab fa-facebook"></a>
                      <a href="#" class="social-login__icon fab fa-twitter"></a>
                    </div>
                  </div>
                </div>
                <div class="screen__background">
                  <span class="screen__background__shape screen__background__shape4"></span>
                  <span class="screen__background__shape screen__background__shape3"></span>
                  <span class="screen__background__shape screen__background__shape2"></span>
                  <span class="screen__background__shape screen__background__shape1"></span>
                </div>
              </div>
            </div>
          </Fragment>

        )
      }
    </Fragment>
  );
};

export default Login;