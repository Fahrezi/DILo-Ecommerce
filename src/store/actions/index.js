import { FETCH_USER, REGISTER, LOGIN, RESET } from "./actionTypes";

export const fetchUser = color => {
  return {
    type: FETCH_USER,
    color
  };
};

export const register = user => {
  return {
    type: REGISTER,
    user
  };
};

export const login = data => {
  return {
    type: LOGIN,
    data
  };
};

export const reset = () => {
  return {
    type: RESET
  };
};
