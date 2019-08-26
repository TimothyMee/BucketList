import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "../config/index";
import { setAlert } from "./alert";

export const loadUser = () => async dispatch => {
  try {
    if (!localStorage.getItem("token")) {
      setAlert("Authorization Error", "danger");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    };
    const res = await axios.get("/api/v1.0/auth", config);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      error.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

//register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { name, email, password };

  try {
    const res = await axios.post("/api/v1.0/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = { email, password };
    const res = await axios.post("/api/v1.0/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error.response);
    const errors = error.response.data;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: LOGOUT
    });
    dispatch({
      type: CLEAR_PROFILE
    });
  } catch (error) {}
};
