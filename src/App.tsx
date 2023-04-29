import React, {useEffect} from 'react';
import './App.css';
import {RouterProvider} from "react-router-dom";
import Router from "./Routers/Router";
import {RecoilRoot, useRecoilState} from "recoil";
import {UserState} from "./State/UserState";
import RetrieveUser from "./Features/Users/Services/RetrieveUserService";
import {refreshTokens} from "./Utilities/AxiosAuthenticatedClient";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {ThemeState} from "./State/ThemeState";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#d50000',
        },
        secondary: {
            main: '#0091ea',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#d50000',
        },
        secondary: {
            main: '#0091ea',
        },
    },
});

function App() {


    return (
        <RecoilRoot>
            <AppRoot/>
        </RecoilRoot>
    );
}

function AppRoot() {

    const [userState, setUserState] = useRecoilState(UserState);
    const [darkThemeState, setDarkThemeState] = useRecoilState(ThemeState);

    useEffect(() => {

        const setUserAsNull = () => {
            setUserState(null);
        }

        const retrieveUser = async () => {

            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return setUserAsNull;

            const didRefresh = await refreshTokens();
            if (!didRefresh) return setUserAsNull;

            const user = await RetrieveUser();
            if (!user) return setUserAsNull;

            await setUserState(user);

        }

        retrieveUser();

    }, []);

    useEffect(() => {

        const shouldUseDarkTheme = localStorage.getItem("useDarkTheme");

        if (shouldUseDarkTheme) setDarkThemeState(true);

    }, []);

    return (
        <ThemeProvider theme={darkThemeState ? darkTheme : lightTheme}>
            <CssBaseline>
                <RouterProvider router={Router}/>
            </CssBaseline>
        </ThemeProvider>
    )

}

export default App;
