import { CREATE_BUCKETLIST, FETCH_ALL_BUCKETLIST } from "../config";

const initalState = [];

export default function(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BUCKETLIST:
      return [...state, payload.data];
    case FETCH_ALL_BUCKETLIST:
      return payload.data;
    default:
      return state;
  }
}
