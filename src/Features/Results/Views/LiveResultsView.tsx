import GeneralAppBar from "../../../Common/GeneralAppBar";
import {CircularProgress, Container, LinearProgress, Paper, Typography} from "@mui/material";
import BreadCrumbs, {IBreadCrumb} from "../../../Common/BreadCrumbs";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import LiveResultsMetrics from "../Components/Live/LiveResultsMetrics";
import {ITestMetaData} from "../Models/ITestMetaData";
import {ILiveResult} from "../Models/ILiveResult";

export default function LiveResultsView() {

    const {organisationId, projectId, testId} = useParams();
    const navigate = useNavigate();

    const [updateState, setUpdateState] = useState(Date.now());
    const [testMetaDataState, setTestMetaDataState] = useState<ITestMetaData>();
    const [liveTestState, setLiveTestState] = useState<ILiveResult>();

    useEffect(() => {

        const fetchResult = async () => {

            try {

                const response = await axiosAuthenticatedClient.get<ILiveResult>(`/api/projects/${projectId}/tests/${testId}/results/live`);
                switch (response.status) {
                    case 200:
                        setLiveTestState(response.data);
                        break;
                    case 204:
                        navigate(`/organisations/${organisationId}/projects/${projectId}/tests/${testId}/results`)
                }

            } catch (e) {
                navigate(`/organisations/${organisationId}/projects/${projectId}`);
            }

        }
        fetchResult();

        const interval = setInterval(() => {
            setUpdateState(Date.now());
        }, 20000);

        return () => {
            clearInterval(interval);
        }

    }, [updateState]);

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
                        {testMetaDataState?.name}
                    </Typography>

                    <Typography variant={"body1"} sx={{whiteSpace: "pre-wrap", overflow: "auto", height: "80%"}}>
                        {testMetaDataState?.description}
                    </Typography>

                </Paper>

                <Paper elevation={3} sx={{p: 3, mb: 3, width: "100%"}}>

                    <Typography variant={"h6"} sx={{mb: 3}}>
                        Progress<span>&nbsp;&nbsp;&nbsp;</span><CircularProgress color={"secondary"} size={20}/>
                    </Typography>

                    <LinearProgress color={"secondary"} variant={"determinate"} value={liveTestState?.progress ?? 0}/>

                </Paper>

                <LiveResultsMetrics results={liveTestState}/>

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
            label: "Live Test",
            link: `#`
        }
    ]
}