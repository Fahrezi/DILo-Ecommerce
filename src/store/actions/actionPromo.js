import { FETCH_PROMO } from '../actions/actionTypes';

export const setPromo = (promo) => {
    return {
        type: FETCH_PROMO,
        promo
    }
}

export const getPromo = () => {
    return dispatch => {
        fetch("https://dilo-ecommerce.herokuapp.com/api/admin/promos")
        .then(response => response.json())
        .then(promo => dispatch(setPromo(promo)));
        // .then(log => console.log(log)); 
  };
    }
}