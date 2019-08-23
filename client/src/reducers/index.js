import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import bucketList from "./bucketList";

export default combineReducers({ alert, auth, bucketList });
