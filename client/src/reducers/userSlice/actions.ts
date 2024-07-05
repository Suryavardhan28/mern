import axiosInstance from "../../axios/axiosInstance";
import {
    PasswordUpdateValues,
    ProfileUpdateValues,
} from "../../components/user/utils";
import { localStorageItemKey, refreshIntervalTime } from "../../config";
import { SignInFormValues, SignUpFormValues } from "../../views/login/utils";
import { USER_INFO_ADD, USER_INFO_REMOVE } from "./actionTypes";

export interface UserInfoToken {
    token: string;
    userInfo: UserInfo;
}

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
    const response = await axiosInstance.post("/api/user/signin", loginInfo);
    if (response.status === 200) {
        const userInfoWithToken: UserInfoToken = response.data;
        dispatch(addUserInfo(userInfoWithToken.userInfo));
        localStorage.setItem(localStorageItemKey, userInfoWithToken.token);
        clearTimeout(refreshTimer as NodeJS.Timeout);
        refreshTimer = setInterval(
            () => dispatch(refresh()),
            refreshIntervalTime
        );
    } else {
        dispatch(logout());
    }
};

export const refresh = () => async (dispatch: any) => {
    const response = await axiosInstance.get("/api/user/refresh");
    if (response.status === 200) {
        const userInfoWithToken: UserInfoToken = response.data;
        dispatch(addUserInfo(userInfoWithToken.userInfo));
        localStorage.setItem(localStorageItemKey, userInfoWithToken.token);
        clearTimeout(refreshTimer as NodeJS.Timeout);
        refreshTimer = setInterval(
            () => dispatch(refresh()),
            refreshIntervalTime
        );
    } else if (response.status === 400) {
        console.log("User not found");
        dispatch(logout());
    } else {
        console.log("Error refreshing data");
        dispatch(logout());
    }
};

export const signUp = (userData: SignUpFormValues) => async () => {
    const response = await axiosInstance.post("/api/user/signup", userData);
    if (response.status === 201) {
        console.log(response.data);
    } else {
        console.log("Signup failed");
    }
};

export const updateProfile =
    (updateProfileData: ProfileUpdateValues) => async (dispatch: any) => {
        try {
            const response = await axiosInstance.put(
                "/api/user/profile",
                updateProfileData
            );
            if (response.status === 201) {
                const userData: UserInfo = response.data;
                dispatch(addUserInfo(userData));
            } else {
                console.error(
                    "Error retrieving user details from local storage"
                );
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

export const updatePassword =
    (updatePasswordData: PasswordUpdateValues) => async () => {
        try {
            const response = await axiosInstance.put(
                "/api/user/password",
                updatePasswordData
            );
            if (response.status === 200) {
                console.log("Updated password successfully");
            }
        } catch (error) {
            console.log("UpdateFailed");
        }
    };
