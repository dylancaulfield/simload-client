import React, {ChangeEvent, useEffect, useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {useParams} from "react-router-dom";
import {Box, Button, Divider, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoadGeneratorList from "./LoadGeneratorList";
import CreateLoadGeneratorDialog from "./CreateLoadGeneratorDialog";

export interface ILoadGenerator {
    id: string,
    name: string,
    apiKey: string
}

export default function LoadGeneratorsTab() {

    const [loadGeneratorsState, setLoadGeneratorsState] = useState<ILoadGenerator[]>([]);
    const [filterState, setFilterState] = useState("");
    const [updateState, setUpdateState] = useState(Date.now());
    const [createDialogState, setCreateDialogState] = useState(false);

    const {organisationId} = useParams();

    const handleCreated = (name: string) => {
        setUpdateState(Date.now());
        setFilterState(name);
    }

    const handleDeleted = (loadGeneratorId: string) => {
        setLoadGeneratorsState(p => p.filter(l => l.id !== loadGeneratorId))
    }

    const handleCreateDialogToggle = () => {
        setCreateDialogState(p => !p);
    }

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterState(event.target.value);
    }

    useEffect(() => {

        const fetchLoadGeneratorCredentials = async () => {

            const response = await axiosAuthenticatedClient.get<ILoadGenerator[]>(`/api/organisations/${organisationId}/load-generators/credentials`);
            setLoadGeneratorsState(response.data);

        }
        fetchLoadGeneratorCredentials();

    }, [updateState]);

    return (
        <>

            <Box sx={{mb: 3}}>
                <Button sx={{float: "right"}} onClick={handleCreateDialogToggle}
                        variant={"contained"}
                        endIcon={<AddIcon/>}>
                    Create
                </Button>

                <TextField size={"small"} label="Search Credentials" variant="outlined" name="name"
                           value={filterState}
                           onChange={handleFilterChange}/>
            </Box>

            <Divider/>

            <LoadGeneratorList loadGenerators={loadGeneratorsState} filter={filterState} onDelete={handleDeleted}/>

            <CreateLoadGeneratorDialog open={createDialogState} onCreate={handleCreated}
                                       onClose={handleCreateDialogToggle}/>

        </>
    )

}