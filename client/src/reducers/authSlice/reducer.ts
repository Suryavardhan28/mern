import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";
import { AuthActionTypes, User } from "./actions";

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authReducer = (
    state = initialState,
    action: AuthActionTypes
): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
