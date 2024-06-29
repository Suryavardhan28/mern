import { LOGIN_SUCCESS, LOGOUT } from "./actionTypes";

export interface User {
    id: number;
    username: string;
    token: string;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActionTypes = LoginSuccessAction | LogoutAction;

export const loginSuccess = (user: User): AuthActionTypes => {
    return {
        type: LOGIN_SUCCESS,
        payload: user,
    };
};

export const logout = (): AuthActionTypes => {
    return {
        type: LOGOUT,
    };
};
