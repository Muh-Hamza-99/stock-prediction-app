import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";

import { ApiError } from "./types";

const cookies = new Cookies();

export const setJWT = (JWT: string) => { cookies.set("jwt", JWT) };

export const getJWT = () => cookies.get("jwt");

export const removeJWT = () => { cookies.remove("jwt") };

export const isAuthenticated = (): boolean => {
    const JWT = getJWT();
    if (!JWT) return false
    const brokenJWT = JWT.split(".");
    if (brokenJWT.length !== 3) return false;
    const payload = JSON.parse(atob(brokenJWT[1]));
    if (Date.now() > (payload.exp * 1000)) {
        removeJWT();
        return false;
    };
    return true;
};

export const getUserID = (): string => {
    const JWT = getJWT();
    return JSON.parse(atob(JWT.split(".")[1])).id;
};

export const logout = () => {
    removeJWT();
    window.location.href = "/";
    window.location.reload();
};

export const dateFormatter = (date: Date): string => {
    const formattedDate = new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short", hour12: true }).format(new Date(date));
    return formattedDate;
};

export const capitalise = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const copyToClipboard = (copyText: string | undefined): void => {
    if (!copyText) {
        toast.error("Can't be copied to clipboard!");
        return;
    };
    navigator.clipboard.writeText(copyText);
    toast.success("Successfully copied to clipboard!");
};

export const toastErrorMessage = (error: any) => {
    if (error instanceof AxiosError) {
        const errorData: AxiosResponse & ApiError = error?.response?.data;
        toast.error(errorData.message)
    } else toast.error("Something went wrong!");
};