import axiosInstance from "../../axios/axiosInstance";
import {
    PasswordUpdateValues,
    ProfileUpdateValues,
} from "../../components/user/utils";
import { localStorageItemKey, refreshIntervalTime } from "../../config/config";
import { SignInFormValues, SignUpFormValues } from "../../views/login/utils";
import { USER_INFO_ADD, USER_INFO_REMOVE } from "./actionTypes";

export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    contact: string;
}

interface UserInfoAddAction {
    type: typeof USER_INFO_ADD;
    payload: UserInfo;
}

interface UserInfoRemoveAction {
    type: typeof USER_INFO_REMOVE;
}

export type AuthActionTypes = UserInfoAddAction | UserInfoRemoveAction;

let refreshTimer: number | NodeJS.Timeout;

export const addUserInfo = (userInfo: UserInfo): AuthActionTypes => {
    return {
        type: USER_INFO_ADD,
        payload: userInfo,
    };
};

export const logout = (): AuthActionTypes => {
    localStorage.removeItem(localStorageItemKey);
    clearTimeout(refreshTimer as NodeJS.Timeout);
    return {
        type: USER_INFO_REMOVE,
    };
};

export const login = (loginInfo: SignInFormValues) => async (dispatch: any) => {
    try {
        const response = await axiosInstance.post(
            "/api/user/signin",
            loginInfo
        );
        const userInfo: UserInfo = response.data.userInfo;
        dispatch(addUserInfo(userInfo));
        clearTimeout(refreshTimer as NodeJS.Timeout);
        refreshTimer = setTimeout(
            () => dispatch(refresh()),
            refreshIntervalTime
        );
        console.log(response.data.message);
    } catch (error: any) {
        console.error(error.data.message);
        throw new Error(error.data.message);
    }
};

export const refresh = () => async (dispatch: any) => {
    try {
        const response = await axiosInstance.get("/api/user/refresh");
        const userInfo: UserInfo = response.data.userInfo;
        dispatch(addUserInfo(userInfo));
        clearTimeout(refreshTimer as NodeJS.Timeout);
        refreshTimer = setTimeout(
            () => dispatch(refresh()),
            refreshIntervalTime
        );
        console.log(response.data.message);
    } catch (error: any) {
        console.error(error.data.message);
        dispatch(logout());
    }
};

export const signUp = (userData: SignUpFormValues) => async () => {
    try {
        const response = await axiosInstance.post("/api/user/signup", userData);

        console.log(response.data.message);
    } catch (error: any) {
        console.error(error.data.message);
        throw new Error(error.data.message);
    }
};

export const updateProfile =
    (updateProfileData: ProfileUpdateValues) => async (dispatch: any) => {
        try {
            const response = await axiosInstance.put(
                "/api/user/profile",
                updateProfileData
            );
            const userData: UserInfo = response.data.userInfo;
            dispatch(addUserInfo(userData));
            console.log(response.data.message);
        } catch (error: any) {
            console.error(error.data.message);
        }
    };

export const updatePassword =
    (updatePasswordData: PasswordUpdateValues) => async () => {
        try {
            const response = await axiosInstance.put(
                "/api/user/password",
                updatePasswordData
            );
            console.log(response.data.message);
        } catch (error: any) {
            console.error(error.data.message);
        }
    };
