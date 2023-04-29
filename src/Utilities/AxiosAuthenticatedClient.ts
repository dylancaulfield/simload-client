import axios, {AxiosError} from "axios";
import axiosAnonymousClient from "./AxiosAnonymousClient";
import {IRetrieveTokensResponse} from "../Features/Users/Services/RetrieveTokensService";

const axiosAuthenticatedClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosAuthenticatedClient.interceptors.request.use(
    async config => {

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("Not authenticated");
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;

    },
    error => Promise.reject(error)
);

axiosAuthenticatedClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {

        if (error.response?.status !== 401) return Promise.reject(error);

        const config = error.config!;

        const didRefresh = await refreshTokens();
        if (!didRefresh) window.location.href = "/sign-in";

        const accessToken = localStorage.getItem("accessToken");

        config.headers.Authorization = `Bearer ${accessToken}`;

        return axios.request(config);

    }
);

export async function refreshTokens(): Promise<boolean> {

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return false;

    try {

        const response = await axiosAnonymousClient.post<IRetrieveTokensResponse>("/api/auth/refresh", {
            refreshToken
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        return true;

    } catch (e: any) {

        return false;

    }


}

export default axiosAuthenticatedClient;