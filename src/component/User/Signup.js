import React, { Fragment, useState, useEffect } from "react";
import "./Signup.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import logo from "./images/assets/digitan_logo.png"
import { Link } from "react-router-dom";

const SignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
            <h2 className="title">Register</h2>
            <div class="container">
              <div class="screen">
                <div class="screen__content">
                  <form class="login" >
                    <div class="login__field">
                      <i class="login__icon fas fa-user"></i>
                      <input
                        placeholder="Enter your name"
                        type="text"
                        required
                        name="name"
                        value={name}
                        onChange={registerDataChange} class="login__input" />
                    </div>
                    <div class="login__field">
                      <i class="login__icon fas fa-lock"></i>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={registerDataChange} class="login__input" />
                    </div>
                    <div class="login__field">
                      <i class="login__icon fas fa-lock"></i>
                      <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={registerDataChange} class="login__input" />
                    </div>
                    <div class="login__field">
                      <i class="login__icon fas fa-lock"></i>
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={registerDataChange} />
                    </div>
                    <button class="button login__submit" onClick={registerSubmit}>
                      <span class="button__text" >Register Now</span>
                      <i class="button__icon fas fa-chevron-right"></i>
                    </button>
                  </form>
                  <div class="social-login">
                    <h3>Already have a account? <Link to="/login" className="signup">Log In</Link></h3>
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

export default SignUp;
