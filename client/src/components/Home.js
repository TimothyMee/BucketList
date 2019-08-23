import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BucketLists from "./BucketLists";

const Home = () => {
  return (
    <Fragment>
      <div className="container-50">
        <BucketLists />
      </div>
      <div className="container-50">
        <BucketLists />
      </div>
    </Fragment>
  );
};

export default Home;
