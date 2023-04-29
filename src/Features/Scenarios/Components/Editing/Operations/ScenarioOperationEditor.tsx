import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Tab, TextField, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {ScenarioEditingWithChangesSelector} from "../../../State/ScenarioEditingState";
import OperationBody from "./OperationBody";
import OperationHeaderList from "./OperationHeaderList";
import OperationQueryParameterList from "./OperationQueryParameterList";
import OperationMethod from "./OperationMethod";
import OperationHost from "./OperationHost";
import OperationPath from "./OperationPath";
import OperationScheme from "./OperationScheme";

export default function ScenarioOperationEditor() {

    const {organisationId, projectId, scenarioId, operationId} = useParams();
    const [tabState, setTabState] = useState("1");

    const navigate = useNavigate();
    const scenario = useRecoilValue(ScenarioEditingWithChangesSelector);

    useEffect(() => {

        const operation = scenario.operations.find(o => o.operationId === operationId);
        if (!operation) {
            navigate(`/organisations/${organisationId}/projects/${projectId}/scenarios/${scenarioId}`);
        }

    }, []);

    const handleTabChange = (event: SyntheticEvent, newValue: string) => {
        setTabState(newValue);
    }

    return (
        <>

            <Box sx={{p: 3}}>

                <Typography variant={"h4"} fontWeight={"bold"}>Request Editor</Typography>
                <Typography variant={"body1"} sx={{mb: 3}}>{operationId}</Typography>

                <Grid container spacing={1} sx={{mb: 3}}>

                    <Grid item sm={2}>

                        <OperationMethod/>

                    </Grid>

                    <Grid item sm={2}>

                        <OperationScheme />

                    </Grid>

                    <Grid item sm={3}>

                        <OperationHost />

                    </Grid>

                    <Grid item sm={5}>

                        <OperationPath />

                    </Grid>

                </Grid>

                <TabContext value={tabState}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Body" value="1"/>
                            <Tab label="Headers" value="2"/>
                            <Tab label="Query Parameters" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{p:0, pt: 3}}>
                        <OperationBody/>
                    </TabPanel>
                    <TabPanel value="2">
                        <OperationHeaderList/>
                    </TabPanel>
                    <TabPanel value="3">
                        <OperationQueryParameterList/>
                    </TabPanel>
                </TabContext>

            </Box>

        </>
    );

}