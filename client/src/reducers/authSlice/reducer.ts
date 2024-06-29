import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from "./actionTypes";
import { AuthActionTypes, UserInfo } from "./actions";

interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    error: boolean;
}

const initialState: AuthState = {
    loading: false,
    userInfo: null,
    error: false,
};

const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                userInfo: null,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                userInfo: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: false,
            };
        default:
            return state;
    }
};

export default authReducer;
