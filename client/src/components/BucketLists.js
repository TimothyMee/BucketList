import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBucketList } from "../actions/bucketList";

const BucketLists = ({ createBucketList }) => {
  const [insertFormData, setInsertFormData] = useState({
    name: ""
  });

  const [editFormData, setEditFormData] = useState({
    name: ""
  });

  const insertName = insertFormData.name;
  const editName = editFormData.name;

  const handleInsertFormData = event => {
    setInsertFormData({
      ...insertFormData,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdateFormData = event => {
    setInsertFormData({
      ...editFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitInsertForm = async event => {
    event.preventDefault();
    createBucketList(insertFormData);
  };
  return (
    <Fragment>
      <section>
        <form className="form" onSubmit={e => submitInsertForm(e)}>
          <h3 className="large text-primary">Create new BucketList</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="New Bucket-List Name"
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

      
    </Fragment>
  );
};

BucketLists.propTypes = {
  createBucketList: PropTypes.func.isRequired
};
export default connect(
  null,
  { createBucketList }
)(BucketLists);
