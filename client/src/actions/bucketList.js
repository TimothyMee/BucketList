import {
  CREATE_BUCKETLIST,
  FETCH_ALL_BUCKETLIST,
  FETCH_BUCKETLIST,
  CHANGE_BUCKETLIST_MODE,
  FETCH_ALL_BUCKETLIST_ITEMS
} from "../config";
import axios from "axios";
import { setAlert } from "./alert";

export const createBucketList = ({ name }) => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const res = await axios.post("/api/v1.0/bucketlist", { name }, config);
    dispatch(setAlert("BucketList successfully created", "success"));
    dispatch({
      type: CREATE_BUCKETLIST,
      payload: { data: res.data }
    });
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const getAllBucketList = () => async dispatch => {
  try {
    console.log("jehjhjehj");
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const res = await axios.get("/api/v1.0/bucketlist", config);
    dispatch({
      type: FETCH_ALL_BUCKETLIST,
      payload: { data: res.data }
    });
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const getAllBucketListItems = id => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const res = await axios.get(`/api/v1.0/bucketlist/${id}/items`, config);
    dispatch({
      type: FETCH_ALL_BUCKETLIST_ITEMS,
      payload: { data: res.data }
    });
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const getBucketList = id => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const res = await axios.get(`/api/v1.0/bucketlist/${id}`, config);
    dispatch({
      type: FETCH_BUCKETLIST,
      payload: { data: res.data }
    });
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const changeBucketListMode = mode => async dispatch => {
  try {
    dispatch({
      type: CHANGE_BUCKETLIST_MODE,
      payload: {
        data: { mode }
      }
    });
  } catch (error) {
    const errors = error.message;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

export const editBucketList = (name, id) => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const res = await axios.put(`/api/v1.0/bucketlist/${id}`, { name }, config);
    dispatch(setAlert("BucketList successfully updated", "success"));
    dispatch(getAllBucketList());
    dispatch({
      type: FETCH_BUCKETLIST,
      payload: { data: res.data }
    });
  } catch (error) {
    console.log(error);
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const addBucketList = (name, id) => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "danger"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const response = await axios.post(
      `/api/v1.0/bucketlist/${id}/items`,
      { name },
      config
    );
    dispatch(setAlert("Item successfully added", "success"));
    dispatch(getAllBucketList());
    dispatch(getBucketList(id));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const editItemInList = (id, name, done, bucketId) => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "success"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const response = await axios.put(
      `/api/v1.0/bucketlist/${bucketId}/items/${id}`,
      { name, done },
      config
    );
    dispatch(setAlert("Item successfully updated", "success"));
    dispatch(getAllBucketList());
    dispatch(getBucketList(bucketId));
  } catch (error) {
    const errors = error.response.data;
    console.log(errors);
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const deleteBucketListData = id => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "success"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const response = await axios.delete(`/api/v1.0/bucketlist/${id}/`, config);
    dispatch(setAlert("BucketList successfully deleted", "success"));
    dispatch(getAllBucketList());
  } catch (error) {
    const errors = error.response.data;
    console.log(errors);
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};

export const deleteBucketItemData = (bucketId, id) => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAlert("Authorization Error", "success"));
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };

    const response = await axios.delete(
      `/api/v1.0/bucketlist/${bucketId}/items/${id}`,
      config
    );
    dispatch(setAlert("Item successfully deleted", "success"));
    dispatch(getAllBucketList());
    dispatch(getBucketList(bucketId));
  } catch (error) {
    const errors = error.response.data;
    console.log(errors);
    if (errors) {
      dispatch(setAlert(errors.msg, "danger"));
    }
  }
};
