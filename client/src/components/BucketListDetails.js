import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  VIEW_MODE,
  EDIT_BUCKETLIST_MODE,
  ADD_ITEM_MODE,
  EDIT_ITEM_MODE,
  EMPTY_MODE,
  CHANGE_BUCKETLIST_MODE
} from "../config";
import {
  changeBucketListMode,
  getAllBucketListItems,
  editBucketList,
  editItemInList,
  addBucketList,
  deleteBucketListData,
  deleteBucketItemData
} from "../actions/bucketList";
import Moment from "react-moment";
import Switch from "react-switch";

const BucketListDetails = ({
  bucketList,
  changeBucketListMode,
  getAllBucketListItems,
  bucketListItems,
  editBucketList,
  editItemInList,
  addBucketList,
  deleteBucketListData,
  deleteBucketItemData
}) => {
  let mode = null;
  let edittedItemID = "";
  if (bucketList) {
    mode = bucketList.mode;
  }
  const [editBucketListData, setEditBucketListData] = useState({
    name: bucketList.name
  });

  const [editItemData, setEditItemData] = useState({
    name: "",
    done: false,
    id: ""
  });

  const [addItemData, setAddItemData] = useState({
    name: ""
  });

  const handleEditBucketFormData = event => {
    setEditBucketListData({
      ...editBucketListData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddBucketItemData = event => {
    setAddItemData({
      ...addItemData,
      [event.target.name]: event.target.value
    });
  };

  const switchChange = event => {
    console.log("event", event);
    setEditItemData({
      ...editItemData,
      ["done"]: event
    });
  };
  const handleEditBucketItemData = event => {
    setEditItemData({
      ...editItemData,
      [event.target.name]: event.target.value
    });
  };

  const bucketListName = editBucketListData.name;
  const addBucketListItem = addItemData.name;
  const editItemName = editItemData.name;
  const editItemStatus = editItemData.done;

  const addItemListView = async () => {
    await changeModeTo(ADD_ITEM_MODE);
    await getAllBucketListItems(bucketList.id);
  };

  const editItemWithID = async (id, name, status) => {
    event.preventDefault();
    console.log(id, name, status);
    changeModeTo(EDIT_ITEM_MODE);

    setEditItemData({
      ...editItemData,
      ["name"]: name,
      ["done"]: status,
      ["id"]: id
    });
  };

  const changeModeTo = mode => {
    event.preventDefault();
    changeBucketListMode(mode);
  };

  const submitEditForm = e => {
    e.preventDefault();
    editBucketList(bucketListName, bucketList.id);
  };
  const submitAddItemForm = e => {
    e.preventDefault();
    addBucketList(addBucketListItem, bucketList.id);
  };
  const submitEditItemForm = e => {
    e.preventDefault();
    editItemInList(
      editItemData.id,
      editItemData.name,
      editItemData.done,
      bucketList.id
    );
  };
  const deleteBucketList = e => {
    e.preventDefault();
    deleteBucketListData(bucketList.id);
  };
  const deleteItem = id => {
    deleteBucketItemData(bucketList.id, id);
  };

  return (
    <Fragment>
      {mode === VIEW_MODE && (
        <section>
          <h3>BucketList Details</h3>

          <div className="">
            <h3 className="">Name: {bucketList.name}</h3>{" "}
            <div className="">
              <button
                className="btn btn-dark"
                onClick={e => changeModeTo(EDIT_BUCKETLIST_MODE)}
              >
                edit
              </button>
              <button
                className="btn btn-primary"
                onClick={e => addItemListView()}
              >
                Add Item
              </button>
              <button
                className="btn btn-danger"
                onClick={e => deleteBucketList(e)}
              >
                delete
              </button>
            </div>
          </div>
          {bucketList.date_created !== "" && (
            <span>
              created on &nbsp;
              <Moment format="YYYY-MM-DD HH:mm">
                {bucketList.date_created}
              </Moment>
            </span>
          )}
          <hr />
          {bucketList.items.length === 0 ? (
            <h1>No Items Yet</h1>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>name</th>
                  <th>status</th>
                  <th>created_at</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {bucketList.items.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.done ? "done" : "pending"}</td>
                      <td>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {item.date_created}
                        </Moment>
                      </td>
                      <td>
                        <div>
                          <a
                            href="#!"
                            className={`badge badge-primary`}
                            onClick={e =>
                              editItemWithID(item._id, item.name, item.done)
                            }
                          >
                            edit
                          </a>
                        </div>
                        <div>
                          <a
                            href="#!"
                            className="badge badge-danger"
                            onClick={e => deleteItem(item.id)}
                          >
                            delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      )}

      {mode === EDIT_BUCKETLIST_MODE && (
        <section>
          <h3>Edit BucketList</h3>

          <form className="form" onSubmit={e => submitEditForm(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder=""
                name="name"
                value={bucketListName}
                onChange={e => handleEditBucketFormData(e)}
              />
              <small className="form-text">
                Current name : {bucketList.name}
              </small>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="submit"
                className="btn btn-primary my-1"
              />
              <span>
                <a href="#!" onClick={e => changeModeTo(VIEW_MODE)}>
                  Go back
                </a>
              </span>
            </div>
          </form>
        </section>
      )}

      {mode === ADD_ITEM_MODE && (
        <section>
          <h3>Add BucketList Items</h3>

          <form className="form" onSubmit={e => submitAddItemForm(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder=""
                name="name"
                value={addBucketListItem}
                onChange={e => handleAddBucketItemData(e)}
              />
              <small className="form-text">Any Item to this BucketLists </small>
            </div>
            <input
              type="submit"
              value="submit"
              className="btn btn-primary my-1"
            />
            <span>
              <a href="#!" onClick={e => changeModeTo(VIEW_MODE)}>
                Go back
              </a>
            </span>
          </form>

          <hr />

          {bucketListItems.length === 0 ? (
            <h3>No Items Yet</h3>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>name</th>
                  <th>status</th>
                  <th>created_at</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {bucketListItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.done ? "done" : "pending"}</td>
                      <td>
                        <Moment format="YYYY-MM-DD HH:mm">
                          {item.date_created}
                        </Moment>
                      </td>
                      <td>
                        <div>
                          <a
                            href="#!"
                            className={`badge badge-primary`}
                            onClick={e =>
                              editItemWithID(item._id, item.name, item.done)
                            }
                          >
                            edit
                          </a>
                        </div>
                        <div>
                          <a
                            href="#!"
                            className="badge badge-danger"
                            onClick={e => deleteItem(item.id)}
                          >
                            delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      )}

      {mode === EDIT_ITEM_MODE && (
        <section>
          <h3>Edit BucketList Item</h3>

          <form className="form" onSubmit={e => submitEditItemForm(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder=""
                name="name"
                value={editItemName}
                onChange={e => handleEditBucketItemData(e)}
              />
              <small className="form-text">Current name : {editItemName}</small>
            </div>
            <div className="form-group">
              <label>done?</label> &nbsp;&nbsp;&nbsp;
              <Switch checked={editItemStatus} onChange={switchChange}></Switch>
              <small className="form-text">
                Current Status : {editItemStatus ? "done" : "pending"}
              </small>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="submit"
                className="btn btn-primary my-1"
              />
              <span>
                <a href="#!" onClick={e => changeModeTo(VIEW_MODE)}>
                  Go back
                </a>
              </span>
            </div>
          </form>
        </section>
      )}

      {mode === EMPTY_MODE && (
        <section>
          <h5>Please click details on the bucketlist you to view and edit</h5>
        </section>
      )}
    </Fragment>
  );
};

BucketListDetails.propTypes = {
  bucketList: PropTypes.object,
  changeBucketListMode: PropTypes.func.isRequired,
  getAllBucketListItems: PropTypes.func.isRequired,
  bucketListItems: PropTypes.array,
  editBucketList: PropTypes.func.isRequired,
  editItemInList: PropTypes.func.isRequired,
  addBucketList: PropTypes.func.isRequired,
  deleteBucketListData: PropTypes.func.isRequired,
  deleteBucketItemData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bucketList: state.activebucketList,
  bucketListItems: state.activeBucketListItems
});

export default connect(
  mapStateToProps,
  {
    changeBucketListMode,
    getAllBucketListItems,
    editBucketList,
    editItemInList,
    addBucketList,
    deleteBucketListData,
    deleteBucketItemData
  }
)(BucketListDetails);
