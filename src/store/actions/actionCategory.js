import { FETCH_CATEGORY } from "./actionTypes";

export const setCategory = category => {
  return {
    type: FETCH_CATEGORY,
    category
  };
};

export const getCategory = () => {
  return dispatch => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/categories")
      .then(response => response.json())
      .then(ctg => dispatch(getCategory(ctg)))
      .catch(err => console.error(err));
  };
};
