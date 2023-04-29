import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

export default function UserAuthAppBar() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    SimLoad
                </Typography>
            </Toolbar>
        </AppBar>
    )

}