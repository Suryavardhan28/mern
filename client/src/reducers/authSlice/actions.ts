import axios from "axios";
import { SignInFormValues } from "../../views/Login/utils";
import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
} from "./actionTypes";

export interface UserInfo {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    contact: string;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: UserInfo;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
}
interface LoginErrorAction {
    type: typeof LOGIN_ERROR;
}

export type AuthActionTypes =
    | LoginSuccessAction
    | LogoutAction
    | LoginRequestAction
    | LoginErrorAction;

export const login = (loginInfo: SignInFormValues) => async (dispatch: any) => {
    dispatch(loginRequest());
    const response = await axios.post("/api/users/signin", loginInfo);
    if (response.status === 200) {
        dispatch(loginSuccess(response.data));
    } else {
        dispatch(loginError());
    }
};

export const loginSuccess = (userInfo: UserInfo): AuthActionTypes => {
    return {
        type: LOGIN_SUCCESS,
        payload: userInfo,
    };
};

export const loginError = (): AuthActionTypes => {
    return {
        type: LOGIN_REQUEST,
    };
};
export const loginRequest = (): AuthActionTypes => {
    return {
        type: LOGIN_REQUEST,
    };
};
export const logout = (): AuthActionTypes => {
    return {
        type: LOGOUT,
    };
};
