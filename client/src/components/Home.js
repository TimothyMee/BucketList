import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BucketLists from "./BucketLists";
import BucketListDetails from "./BucketListDetails";

const Home = () => {
  return (
    <Fragment>
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

export default Home;
