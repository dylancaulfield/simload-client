import axios from "axios";

export interface CreateUserRequest {
    displayName: string,
    emailAddress: string,
}

export default async function createUser(request: CreateUserRequest): Promise<string | undefined> {

    try {
        await axios.post("/api/users", request);
    } catch (e: any) {
        return e.message;
    }

    return;

}