import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, userIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const handleFormChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const submitForm = event => {
    event.preventDefault();
    login({ email, password });
  };

  if (userIsAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user" /> Sign into Your Account
        </p>
        <form className="form" onSubmit={e => submitForm(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => handleFormChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => handleFormChange(e)}
              required
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool
};

const mapStateToProp = state => ({
  userIsAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProp,
  { login }
)(Login);
