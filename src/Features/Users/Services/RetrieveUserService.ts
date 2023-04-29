import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

export interface IRetrievedUser {
    displayName: string,
    emailAddresses: string[]
}

/*
    This user is used as the default user while the application
    checks for valid credentials on reload to prevent immediate
    redirection to the login screen
 */
export const PageLoadUser: IRetrievedUser = {
    displayName: "",
    emailAddresses: []
}
export default async function RetrieveUser(): Promise<IRetrievedUser> {

    return (await axiosAuthenticatedClient.get<IRetrievedUser>("/api/users")).data;

}