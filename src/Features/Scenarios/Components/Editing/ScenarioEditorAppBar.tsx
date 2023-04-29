import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React, {ChangeEvent} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {UserPresent, UserState} from "../../../../State/UserState";
import {ThemeState} from "../../../../State/ThemeState";
import {DarkThemeSwitch} from "../../../../Common/GeneralAppBar";
import {Link, useParams} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";

export default function ScenarioEditorAppBar() {

    const [userState, setUserState] = useRecoilState(UserState);
    const [darkThemeState, setDarkThemeState] = useRecoilState(ThemeState);
    const userActive = useRecoilValue(UserPresent);

    const {organisationId, projectId} = useParams();

    const signOut = () => {
        setUserState(null);
        localStorage.clear();
    }

    const handleThemeChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setDarkThemeState(checked);
    }

    return (
        <AppBar elevation={0} color={"primary"} position="static" sx={{mb: 0}}>
            <Toolbar>
                <Typography variant="h6" component={"div"} sx={{flexGrow: 1}}>
                    <Button startIcon={<ArrowBack/>} color={"inherit"} component={Link} to={`/organisations/${organisationId}/projects/${projectId}`}>
                        Exit
                    </Button>
                </Typography>

                <DarkThemeSwitch onChange={handleThemeChange} checked={darkThemeState}
                                 value={darkThemeState}></DarkThemeSwitch>
            </Toolbar>
        </AppBar>
    )

}