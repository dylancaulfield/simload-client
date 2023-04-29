import React, {ChangeEvent, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Box, Button, Divider, TextField} from "@mui/material";
import {CompareArrows, Start} from "@mui/icons-material";
import TestList from "./TestList";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

export interface ITest {
    id: string,
    name: string,
    status: TestStatus,
    startedAt: string
    endedAt: string
}

export enum TestStatus {
    InProgress,
    Complete
}

export default function TestsTab() {

    const {organisationId, projectId} = useParams();

    const [testsState, setTestsState] = useState<ITest[]>([]);
    const [filterState, setFilterState] = useState("");

    useEffect(() => {

        const fetchTests = async () => {

            try {
                const response = await axiosAuthenticatedClient.get<ITest[]>(`/api/organisations/${organisationId}/projects/${projectId}/tests`);
                setTestsState(response.data);
            } catch (e) {
                console.log(e);
            }

        }
        fetchTests();

    }, []);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterState(event.target.value);
    }

    return (
        <>

            <Box sx={{mb: 3}}>

                <Button sx={{float: "right", ml: 3}} component={Link}
                        to={`/organisations/${organisationId}/projects/${projectId}/tests/start`}
                        variant={"contained"}
                        endIcon={<Start/>}>
                    Start
                </Button>

                {/*
                <Button sx={{float: "right"}} component={Link}
                        to={`/organisations/${organisationId}/projects/${projectId}/tests/compare`}
                        variant={"contained"}
                        color={"secondary"}
                        endIcon={<CompareArrows/>}>
                    Compare
                </Button>
                */}

                <TextField size={"small"} label="Search Tests" variant="outlined"
                           value={filterState}
                           onChange={handleFilterChange}/>
            </Box>

            <Divider/>

            <TestList tests={testsState} filter={filterState}/>

        </>
    )

}