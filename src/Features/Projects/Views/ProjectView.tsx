import React, {useEffect, useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {useParams} from "react-router-dom";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {Box, Container, Paper, Tab, Tabs, Typography} from "@mui/material";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import {TabContext, TabPanel} from "@mui/lab";
import ScenarioList from "../../Scenarios/Components/ScenarioList";
import TestsTab from "../Components/TestsTab";

interface IProject {
    projectId: string,
    name: string,
    description: string,
    members: {
        displayName: string
    }[],
    scenarios: {
        scenarioId: string,
        name: string
    }[]
}

enum TabState {
    Scenarios,
    Members,
    Tests
}

export default function ProjectView() {

    const [projectState, setProjectState] = useState<IProject>();
    const [tabState, setTabState] = useState<TabState>(TabState.Scenarios);

    const {organisationId, projectId} = useParams();

    useEffect(() => {

        const retrieveProject = async () => {

            const response = await axiosAuthenticatedClient.get<IProject>(`/api/organisations/${organisationId}/projects/${projectId}`);
            setProjectState(response.data);

        }
        retrieveProject();

    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabState(newValue);
    };

    return (
        <>

            <GeneralAppBar/>

            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs(organisationId, projectId)}/>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%", height: "30vh"}}>

                    <Typography sx={{mb: 2}} variant={"h4"} fontWeight={"bold"} component={"h1"}>
                        {projectState?.name}
                    </Typography>

                    <Typography variant={"body1"} sx={{whiteSpace: "pre-wrap", overflow: "auto", height: "80%"}}>
                        {projectState?.description}
                    </Typography>

                </Paper>

                <Paper elevation={3} sx={{mb: 3, width: "100%"}}>
                    <TabContext value={tabState.toString()}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={tabState.toString()} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Scenarios" value={TabState.Scenarios.toString()}/>
                                {/*<Tab label="Members" value={TabState.Members.toString()}/>*/}
                                <Tab label="Tests" value={TabState.Tests.toString()}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={TabState.Scenarios.toString()}>

                            <ScenarioList/>

                        </TabPanel>
                        <TabPanel value={TabState.Members.toString()}>
                            Members
                        </TabPanel>
                        <TabPanel value={TabState.Tests.toString()}>

                            <TestsTab/>

                        </TabPanel>
                    </TabContext>
                </Paper>

            </Container>


        </>
    )

}

function breadCrumbs(organisationId: string | undefined, projectId: string | undefined): IBreadCrumb[] {
    return [
        {
            label: "Organisations",
            link: "/organisations"
        },
        {
            label: "Organisation",
            link: `/organisations/${organisationId}`
        },
        {
            label: "Project",
            link: `#`
        }
    ]
}