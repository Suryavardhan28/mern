import axiosInstance from "../../axios/axiosInstance";
import {
    PasswordUpdateValues,
    ProfileUpdateValues,
} from "../../components/user/utils";
import { localStorageItemKey } from "../../config";
import { SignInFormValues, SignUpFormValues } from "../../views/login/utils";
import { USER_INFO_ADD, USER_INFO_REMOVE } from "./actionTypes";

export interface UserInfo {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    contact: string;
}

export interface ProfileInfo {
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

export const login = (loginInfo: SignInFormValues) => async (dispatch: any) => {
    const response = await axiosInstance.post("/api/users/signin", loginInfo);
    if (response.status === 200) {
        const userInfo: UserInfo = response.data;
        dispatch(addUserInfo(userInfo));
        localStorage.setItem(localStorageItemKey, JSON.stringify(userInfo));
    } else {
        dispatch(logout());
    }
};

export const signUp = (userData: SignUpFormValues) => async () => {
    const response = await axiosInstance.post("/api/users/signup", userData);
    if (response.status === 201) {
        console.log(response.data);
    } else {
        console.log("Signup failed");
    }
};

export const addUserInfo = (userInfo: UserInfo): AuthActionTypes => {
    return {
        type: USER_INFO_ADD,
        payload: userInfo,
    };
};

export const logout = (): AuthActionTypes => {
    localStorage.removeItem(localStorageItemKey);
    return {
        type: USER_INFO_REMOVE,
    };
};

export const updateProfile =
    (updateProfileData: ProfileUpdateValues) => async (dispatch: any) => {
        try {
            const response = await axiosInstance.put(
                "/api/users/profile",
                updateProfileData
            );
            if (response.status === 201) {
                const userInfo: ProfileInfo = response.data;
                const oldUserInfoData =
                    localStorage.getItem(localStorageItemKey);
                if (oldUserInfoData) {
                    const oldUserInfo = JSON.parse(oldUserInfoData);
                    const updatedUserInfo: UserInfo = {
                        ...userInfo,
                        token: oldUserInfo.token,
                    };
                    dispatch(addUserInfo(updatedUserInfo));
                    localStorage.setItem(
                        localStorageItemKey,
                        JSON.stringify(updatedUserInfo)
                    );
                } else {
                    console.error(
                        "Error retrieving user details from local storage"
                    );
                }
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

export const updatePassword =
    (updatePasswordData: PasswordUpdateValues) => async () => {
        try {
            const response = await axiosInstance.put(
                "/api/users/password",
                updatePasswordData
            );
            if (response.status === 200) {
                console.log("Updated password successfully");
            }
        } catch (error) {
            console.log("UpdateFailed");
        }
    };
