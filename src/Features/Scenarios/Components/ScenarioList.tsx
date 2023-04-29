import React, {ChangeEvent, useEffect, useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {filterText} from "../../../Utilities/Filter";


interface IScenario {
    id: string,
    name: string,
    lastUpdated: Date
}

interface IScenarioListViewState {
    scenarios: IScenario[] | null
}

export default function ScenarioList() {

    const [scenariosState, setScenariosState] = useState<IScenarioListViewState>({
        scenarios: null
    });
    const [scenarioFilterState, setScenarioFilterState] = useState("");

    const {organisationId, projectId} = useParams();

    useEffect(() => {

        const fetchScenarios = async () => {

            const response = await axiosAuthenticatedClient.get<IScenario[]>(`/api/projects/${projectId}/scenarios`);
            setScenariosState({
                scenarios: response.data
            });

        }
        fetchScenarios();

    }, []);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScenarioFilterState(e.target.value);
    }

    const scenariosList = () => {

        if (!scenariosState.scenarios) {
            return <CircularProgress color={"primary"}></CircularProgress>
        }

        if (!scenariosState.scenarios.length) {
            return <Typography sx={{mt: 3}} variant={"body1"}>You are not a member of any scenarios.</Typography>
        }

        const scenarios = scenariosState.scenarios!
            .filter(s => filterText(s, scenarioFilterState))
            .map(s => {
                return (
                    <TableRow key={s.id}>
                        <TableCell align={"left"}>
                            <Link component={RouterLink}
                                  to={`/organisations/${organisationId}/projects/${projectId}/scenarios/${s.id}`}>
                                {s.name}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {new Date(s.lastUpdated).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                )
            });
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Last Updated</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scenarios}
                </TableBody>
            </Table>
        )

    }

    return (
        <>

            <Box sx={{mb: 3}}>
                <Button sx={{float: "right"}} component={RouterLink}
                        to={`/organisations/${organisationId}/projects/${projectId}/scenarios/create`}
                        variant={"contained"} endIcon={<AddIcon/>}>
                    Create
                </Button>

                <TextField size={"small"} label="Search Scenarios" variant="outlined" name="name"
                           value={scenarioFilterState}
                           onChange={handleFilterChange}/>
            </Box>

            <Divider/>

            {scenariosList()}

        </>
    )

}
