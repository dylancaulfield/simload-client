import React from "react";
import {Button, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import GeneralAppBar from "../../../Common/GeneralAppBar";

export default function HomeView() {

    return (
        <>

            <GeneralAppBar/>

            <Container>

                <Typography variant={"h2"} component={"h1"}>SimLoad</Typography>

                <Button component={Link} to={"/organisations"} variant={"contained"}>
                    Go to App
                </Button>

                <Button component={Link} to={"/sign-up"} variant={"contained"}>
                    Sign Up
                </Button>


            </Container>
        </>
    )
}