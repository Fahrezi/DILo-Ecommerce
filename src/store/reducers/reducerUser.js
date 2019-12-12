import { LOGIN, LOGOUT } from "../actions/actionTypes";

const token = localStorage.getItem("token");

const initialState = {
  login: token ? true : false
};

export default function reducerUser(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const user = action.user;
      fetch("https://dilo-ecommerce.herokuapp.com/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.token !== undefined) {
            localStorage.setItem("token", data.token);
          }
          return data.token;
        })
        .then(token => {
          state.login = token !== undefined ? true : false;
        })
        .then(() => {
          if (state.login) {
            alert("Anda Berhasil Masuk!");
            window.location.reload(false);
          } else {
            alert("Gagal !");
          }
        });
      return { ...state, login: token ? true : false };
    case LOGOUT:
      let confirm = window.confirm("Anda Yakin Ingin Keluar ?");
      if (confirm) {
        localStorage.removeItem("token");
        window.location.reload(false);
      }
      return { ...state, login: token ? true : false };
    default:
      return state;
  }
}
