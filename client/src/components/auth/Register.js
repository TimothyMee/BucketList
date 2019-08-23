import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
//redux thingy
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

// const Register = props => {
const Register = ({ setAlert, register, userIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const handleFormChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
      console.log("Password do not match");
    } else {
      register(formData);
    }
  };

  if (userIsAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => handleFormChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => handleFormChange(e)}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => handleFormChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => handleFormChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  userIsAuthenticated: PropTypes.bool
};

const mapStateToProp = state => ({
  userIsAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProp,
  { setAlert, register }
)(Register);
