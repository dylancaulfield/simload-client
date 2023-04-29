import axiosAnonymousClient from "../../../Utilities/AxiosAnonymousClient";

export interface IRetrieveTokensRequest {
    session: string,
    code: string
}

export interface IRetrieveTokensResponse {
    accessToken: string,
    refreshToken: string
}

export default async function RetrieveTokens(request: IRetrieveTokensRequest): Promise<[string, undefined] | [undefined, IRetrieveTokensResponse]> {

    try {
        return [undefined, (await axiosAnonymousClient.post<IRetrieveTokensResponse>("/api/auth/token", request)).data];
    } catch (e: any) {
        return [e.message, undefined];
    }

}