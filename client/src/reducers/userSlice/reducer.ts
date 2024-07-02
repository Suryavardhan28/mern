import { USER_INFO_ADD, USER_INFO_REMOVE } from "./actionTypes";
import { AuthActionTypes, UserInfo } from "./actions";

interface UserState {
    userInfo?: UserInfo | null;
}

const initialState: UserState = {
    userInfo: null,
};

const userReducer = (
    state = initialState,
    action: AuthActionTypes
): UserState => {
    switch (action.type) {
        case USER_INFO_REMOVE:
            return {
                ...state,
                userInfo: null,
            };
        case USER_INFO_ADD:
            return {
                ...state,
                userInfo: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
