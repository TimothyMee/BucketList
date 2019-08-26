import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createBucketList,
  getAllBucketList,
  getBucketList
} from "../actions/bucketList";
import Moment from "react-moment";

const BucketLists = ({
  createBucketList,
  bucketLists,
  getAllBucketList,
  getBucketList
}) => {
  const [insertFormData, setInsertFormData] = useState({
    name: ""
  });

  const insertName = insertFormData.name;

  const handleInsertFormData = event => {
    setInsertFormData({
      ...insertFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitInsertForm = async event => {
    event.preventDefault();
    createBucketList(insertFormData);
  };

  const viewDetails = id => {
    getBucketList(id);
  };

  useEffect(() => {
    getAllBucketList();
  }, []);
  return (
    <Fragment>
      <section>
        <form className="form" onSubmit={e => submitInsertForm(e)}>
          <h5 className="lead text-primary">Create new BucketList</h5>
          <div className="form-group">
            <input
              type="text"
              placeholder="New BucketList Name"
              name="name"
              value={insertName}
              onChange={e => handleInsertFormData(e)}
            />
            <small className="form-text">
              Any name of the BucketLists you want to create
            </small>
          </div>

          <input
            type="submit"
            value="submit"
            className="btn btn-primary my-1"
          />
        </form>
      </section>

      <section>
        <hr />
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>created_at</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {bucketLists.map(function(bucketList, index) {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{bucketList.name}</td>
                  <td>
                    <Moment format="YYYY-MM-DD HH:mm">
                      {bucketList.date_created}
                    </Moment>
                  </td>
                  <td>
                    <a href="#!" onClick={e => viewDetails(bucketList._id)}>
                      details
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </Fragment>
  );
};

BucketLists.propTypes = {
  createBucketList: PropTypes.func.isRequired,
  getAllBucketList: PropTypes.func.isRequired,
  getBucketList: PropTypes.func.isRequired,
  bucketLists: PropTypes.array
};

const mapStateToProps = state => ({
  bucketLists: state.bucketList
});
export default connect(
  mapStateToProps,
  { createBucketList, getAllBucketList, getBucketList }
)(BucketLists);
