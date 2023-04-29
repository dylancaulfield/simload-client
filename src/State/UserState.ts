import {atom, selector} from "recoil";
import {IRetrievedUser, PageLoadUser} from "../Features/Users/Services/RetrieveUserService";

export const UserState = atom<IRetrievedUser | null>({
    key: "UserState",
    default: PageLoadUser
});

export const UserPresent = selector<boolean>({
    key: "UserPresent",
    get: ({get}): boolean => {
        const userState = get(UserState);
        return Boolean(userState);
    }
})
