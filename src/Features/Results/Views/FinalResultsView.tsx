import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IFinalResult} from "../Models/IFinalResult";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import GeneralAppBar from "../../../Common/GeneralAppBar";
import {Container, Paper, Typography} from "@mui/material";
import {ITestMetaData} from "../Models/ITestMetaData";
import IntervalGraphController from "../Components/Final/IntervalGraphController";
import ScenarioResults from "../Components/Final/ScenarioResults";
import OverallResults from "../Components/Final/OverallResults";

export default function FinalResultsView() {

    const [finalResultState, setFinalResultState] = useState<IFinalResult>();
    const [testMetaDataState, setTestMetaDataState] = useState<ITestMetaData>();

    const {organisationId, projectId, testId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchResults = async () => {

            try {
                const response = await axiosAuthenticatedClient.get<IFinalResult>(`/api/projects/${projectId}/tests/${testId}/results`);
                if (response.status === 204) navigate(`/organisations/${organisationId}/projects/${projectId}/tests/${testId}/results/live`);

                setFinalResultState(response.data);
            } catch (e) {
                navigate(`/organisations/${organisationId}/projects/${projectId}`);
            }

        }
        fetchResults();

    }, []);

    useEffect(() => {

        const fetchMetaData = async () => {

            try {

                const response = await axiosAuthenticatedClient.get<ITestMetaData>(`/api/organisations/${organisationId}/projects/${projectId}/tests/${testId}`);
                setTestMetaDataState(response.data);

            } catch (e) {
                navigate(`/organisations/${organisationId}/projects/${projectId}`);
            }

        }
        fetchMetaData();

    }, []);

    return (
        <>

            <GeneralAppBar/>

            <Container maxWidth={"xl"} sx={{mb: 3}}>

                <BreadCrumbs breadCrumbs={breadCrumbs(organisationId, projectId)}/>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%", height: "15vh"}}>

                    <Typography sx={{mb: 2}} variant={"h4"} fontWeight={"bold"} component={"h1"}>
                        Test: {testMetaDataState?.name}
                    </Typography>

                    <Typography variant={"body1"} sx={{whiteSpace: "pre-wrap", overflow: "auto", height: "80%"}}>
                        {testMetaDataState?.description}
                    </Typography>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%"}}>

                    <OverallResults result={finalResultState}/>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%"}}>

                    <IntervalGraphController intervals={finalResultState?.minuteIntervals}/>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%"}}>

                    <ScenarioResults result={finalResultState}/>

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
            link: `/organisations/${organisationId}/projects/${projectId}`
        },
        {
            label: "Result",
            link: `#`
        }
    ]
}