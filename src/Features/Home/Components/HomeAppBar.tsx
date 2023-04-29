import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import React from "react";

export default function HomeAppBar() {

    return (
        <AppBar position="static">
            <Toolbar>


                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    SimLoad
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )

}

/*
<IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <MenuIcon/>
                </IconButton>
 */