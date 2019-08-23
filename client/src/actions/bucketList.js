import { CREATE_BUCKETLIST } from "../config";
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
    console.log(res.data);
    dispatch({
      type: CREATE_BUCKETLIST,
      payload: { data: res.data }
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};
