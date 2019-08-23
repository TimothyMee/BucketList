import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BucketLists from "./BucketLists";

const Home = () => {
  return (
    <Fragment>
      <div className="container">
        <BucketLists />
      </div>
    </Fragment>
  );
};

export default Home;
