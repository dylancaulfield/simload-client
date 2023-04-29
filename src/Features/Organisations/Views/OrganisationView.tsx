import GeneralAppBar from "../../../Common/GeneralAppBar";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import {Box, Container, Paper, Tab, Tabs, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {TabContext, TabPanel} from "@mui/lab";
import ProjectList from "../../Projects/Components/ProjectList";
import LoadGeneratorsTab from "../Components/LoadGeneratorsTab";

interface IOrganisation {
    name: string,
    description: string
}

interface IOrganisationViewState {
    organisation: IOrganisation | null
}

enum TabState {
    Projects,
    Members,
    LoadGenerators
}

export default function OrganisationView() {

    const [organisationState, setOrganisationState] = useState<IOrganisationViewState>({
        organisation: null
    });
    const [tabState, setTabState] = useState<TabState>(TabState.Projects);

    const {organisationId} = useParams();

    useEffect(() => {

        const fetchOrganisation = async () => {

            const response = await axiosAuthenticatedClient.get<IOrganisation>(`/api/organisations/${organisationId}`);
            setOrganisationState({
                organisation: response.data
            });

        }
        fetchOrganisation();

    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabState(newValue);
    };

    return (
        <>

            <GeneralAppBar/>

            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs()}/>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%", height: "30vh"}}>

                    <Typography sx={{mb: 2}} variant={"h4"} fontWeight={"bold"} component={"h1"}>
                        {organisationState.organisation?.name}
                    </Typography>

                    <Typography variant={"body1"} sx={{whiteSpace: "pre-wrap", overflow: "auto", height: "80%"}}>
                        {organisationState.organisation?.description}
                    </Typography>

                </Paper>

                <Paper elevation={3} sx={{mb: 3, width: "100%"}}>
                    <TabContext value={tabState.toString()}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={tabState.toString()} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Projects" value={TabState.Projects.toString()}/>
                                {/*<Tab label="Members" value={TabState.Members.toString()}/>*/}
                                <Tab label="Load Generators" value={TabState.LoadGenerators.toString()}/>
                            </Tabs>
                        </Box>
                        <TabPanel value={TabState.Projects.toString()}>

                            <ProjectList/>

                        </TabPanel>
                        <TabPanel value={TabState.Members.toString()}>
                            Members
                        </TabPanel>
                        <TabPanel value={TabState.LoadGenerators.toString()}>

                            <LoadGeneratorsTab/>

                        </TabPanel>
                    </TabContext>
                </Paper>

            </Container>

        </>
    )


}

function breadCrumbs(): IBreadCrumb[] {

    return [
        {
            label: "Organisations",
            link: "/organisations"
        },
        {
            label: "Organisation",
            link: "#"
        }
    ]

}