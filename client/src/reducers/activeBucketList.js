import {
  FETCH_BUCKETLIST,
  VIEW_MODE,
  EMPTY_MODE,
  CHANGE_BUCKETLIST_MODE
} from "../config";

const initalState = {
  name: "",
  id: "",
  date_created: "",
  date_modified: "",
  items: [],
  mode: EMPTY_MODE
};

export default function(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_BUCKETLIST:
      return {
        ...state,
        name: payload.data.name,
        id: payload.data._id,
        date_created: payload.data.date_created,
        date_modified: payload.data.date_modified,
        mode: VIEW_MODE,
        items: payload.data.items
      };
    case CHANGE_BUCKETLIST_MODE:
      return {
        ...state,
        mode: payload.data.mode
      };
    default:
      return state;
  }
}
