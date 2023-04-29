import {useRecoilState, useRecoilValue} from "recoil";
import {
    CreateScenarioFlow,
    ScenarioCreationState,
    ScenarioCreationStateFilteredOperations,
    ScenarioCreationStateHostToggles
} from "../../State/ScenarioCreationState";
import {Button, Checkbox, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import React, {ChangeEvent} from "react";
import ScenarioCreateFilteredOperationsAccordion from "./ScenarioCreateFilteredOperationsAccordion";
import {Close} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

export default function ScenarioCreateFilter() {

    const [_, setScenarioCreateState] = useRecoilState(ScenarioCreationState);
    const hostTogglesState = useRecoilValue(ScenarioCreationStateHostToggles);
    const filteredOperations = useRecoilValue(ScenarioCreationStateFilteredOperations);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {

        setScenarioCreateState(prev => {

            const {operations, selectedHosts, flow} = prev;
            const checked = event.target.checked;
            let hosts: string[] = [];

            if (!checked) {
                hosts = selectedHosts.filter(h => h !== event.target.value)
            }

            if (checked) {
                hosts = selectedHosts.map(h => h);
                hosts.push(event.target.value);
            }

            return {
                operations,
                flow,
                selectedHosts: hosts
            }

        });

    };

    const handleCreate = () => {

        setScenarioCreateState(prev => {
            return {
                ...prev,
                flow: CreateScenarioFlow.Finalise
            }
        });

    }

    const hostToggles = hostTogglesState.map(t => {
        return (
            <ListItem sx={{width: "100%"}} key={t.host}
                      secondaryAction={
                          <Checkbox onChange={handleToggle} value={t.host} checked={t.selected}/>
                      }
            >
                <ListItemText primary={t.host}/>
            </ListItem>
        )
    });

    return (
        <>

            <Paper sx={{p: 3, mb: 3}}>

                <Typography variant={"h5"} fontWeight={"bold"} component={"h2"} gutterBottom>
                    Step 2.
                </Typography>

                <Typography gutterBottom variant={"body1"}>
                    Select the hosts to be included in the scenario:
                </Typography>

                <List sx={{mb: 3}}>
                    {hostToggles}
                </List>

                <Button variant={"outlined"} endIcon={<Close/>}>
                    Cancel
                </Button>

                <Button onClick={handleCreate} variant={"contained"} endIcon={<AddIcon/>} sx={{float: "right"}}>
                    Create
                </Button>

            </Paper>

            <ScenarioCreateFilteredOperationsAccordion/>


        </>
    )

}