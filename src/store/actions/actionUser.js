import { FETCH_USER, REGISTER, LOGIN, LOGOUT, RESET } from "./actionTypes";

export const login = user => {
  return {
    type: LOGIN,
    user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
