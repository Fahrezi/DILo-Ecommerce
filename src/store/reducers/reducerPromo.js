import { FETCH_PROMO } from "../actions/actionTypes";

const initialState = {
  promo: []
};

export default function reducerPromo(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROMO:
      const promo = action.promo;
      return { ...state, promo };
    default:
      return state;
  }
}
