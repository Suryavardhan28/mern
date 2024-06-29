import { combineReducers } from "redux";
import authReducer from "./authSlice/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;