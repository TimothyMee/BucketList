import { CREATE_BUCKETLIST } from "../config";

const initalState = [];

export default function(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BUCKETLIST:
      return [...state, payload.data];
    default:
      return state;
  }
}
