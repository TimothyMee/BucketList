import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createBucketList, getAllBucketList } from "../actions/bucketList";

const BucketLists = ({ createBucketList, bucketLists, getAllBucketList }) => {
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

  useEffect(() => {
    getAllBucketList();
  }, []);
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

      <section>
        <table>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>created_at</th>
          </tr>
          {bucketLists.map(function(bucketList, index) {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{bucketList.name}</td>
                <td>{bucketList.date_created}</td>
              </tr>
            );
          })}
        </table>
      </section>
    </Fragment>
  );
};

BucketLists.propTypes = {
  createBucketList: PropTypes.func.isRequired,
  getAllBucketList: PropTypes.func.isRequired,
  bucketLists: PropTypes.object
};

const mapStateToProps = state => ({
  bucketLists: state.bucketList
});
export default connect(
  mapStateToProps,
  { createBucketList, getAllBucketList }
)(BucketLists);
