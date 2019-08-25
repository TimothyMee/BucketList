import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import bucketList from "./bucketList";
import activebucketList from "./activeBucketList";
import activeBucketListItems from "./activeBucketListItems";

export default combineReducers({
  alert,
  auth,
  bucketList,
  activebucketList,
  activeBucketListItems
});
