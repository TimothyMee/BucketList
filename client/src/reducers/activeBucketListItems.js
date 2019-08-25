import { FETCH_ALL_BUCKETLIST_ITEMS } from "../config";

const initalState = [];

export default function(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ALL_BUCKETLIST_ITEMS:
      return (state = payload.data);
    default:
      return state;
  }
}
