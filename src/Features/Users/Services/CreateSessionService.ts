import axiosAnonymousClient from "../../../Utilities/AxiosAnonymousClient";

export interface ICreateSessionRequest {
    emailAddress: string,
    session: string | undefined
}

export interface ICreateSessionResponse {
    session: string
}

export default async function CreateSession(request: ICreateSessionRequest): Promise<[string, undefined] | [undefined, ICreateSessionResponse]> {

    try {
        return [undefined, (await axiosAnonymousClient.post<ICreateSessionResponse>("/api/auth/session", request)).data];
    } catch (e: any) {
        return [e.message, undefined];
    }

}