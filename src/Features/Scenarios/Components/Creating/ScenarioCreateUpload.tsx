import {Button, Grid, Paper, Typography} from "@mui/material";
import {Upload} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import parseHar from "../../Services/HarParser";
import generateOperations from "../../Services/OperationsGenerator";
import {useRecoilState} from "recoil";
import {CreateScenarioFlow, ScenarioCreationState} from "../../State/ScenarioCreationState";

export default function ScenarioCreateUpload() {

    const [_, setScenarioCreateState] = useRecoilState(ScenarioCreationState);

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (!event.target?.files?.length) return;

        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const requests = parseHar(e.target?.result as string);
            const operations = generateOperations(requests);
            const hosts: string[] = [];

            for (const operation of operations) {

                if (!hosts.includes(operation.request.host))
                    hosts.push(operation.request.host);

            }

            setScenarioCreateState({
                operations,
                selectedHosts: hosts,
                flow: CreateScenarioFlow.Filter
            });

        };
        reader.readAsText(event.target?.files?.item(0) as Blob);

    }

    return (
        <>

            <Paper sx={{p: 3}}>

                <Grid container spacing={3}>

                    <Grid item md={6}>

                        <Typography variant={"h5"} fontWeight={"bold"} component={"h2"} gutterBottom>
                            Step 1.
                        </Typography>

                        <Typography variant={"body1"}>
                            Upload a .har file from Chrome developer tools.
                        </Typography>

                    </Grid>

                    <Grid item md={6}>

                        <Button variant={"contained"} component={"label"} endIcon={<Upload/>}>
                            Upload
                            <input type={"file"} hidden accept={"har"} onChange={handleUpload}/>
                        </Button>


                    </Grid>

                </Grid>

            </Paper>

        </>
    )

}