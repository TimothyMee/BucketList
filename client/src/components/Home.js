import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BucketLists from "./BucketLists";
import BucketListDetails from "./BucketListDetails";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const Home = ({ logout }) => {
  const logUserOut = () => {
    logout();
  };

  return (
    <Fragment>
      <div className="navbar">
        <nav className="navbar bg-dark">
          <h5>
            <Link to="/">BucketLists</Link>
          </h5>
          <ul>
            <li>
              <a onClick={e => logUserOut()} href="#!">
                <i className="fas fa-sign-out-alt" />{" "}
                <span className="hide-sm">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-50">
        <BucketLists />
      </div>
      <div className="card card-body bg-light container-50">
        <BucketListDetails />
        {/* border-left-color: rgb(222, 226, 230); */}
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Home);
