import { FETCH_CATEGORY } from "../actions/actionTypes";

const initialState = {
  category: []
};

export default function reducerCategory(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      const category = action.category;
      return { ...state, category };
    default:
      return state;
  }
}
