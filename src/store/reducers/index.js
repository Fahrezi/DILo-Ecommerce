import { combineReducers } from "redux";
import reducerCategory from "./reducerCategory";
import reducerPromo from "./reducerPromo";
import reducerUser from "./reducerUser";

export default combineReducers({
  reducerCategory,
  reducerPromo,
  reducerUser
});
