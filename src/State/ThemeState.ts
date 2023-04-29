import {atom} from "recoil";

export const ThemeState = atom<boolean>({
    key: "ThemeState",
    default: false
});