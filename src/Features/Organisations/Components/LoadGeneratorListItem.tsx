import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";
import {useParams} from "react-router-dom";
import {ILoadGenerator} from "./LoadGeneratorsTab";

export interface ILoadGeneratorItemProps {
    loadGenerator: ILoadGenerator,

    onDelete(loadGeneratorId: string): void
}

export default function LoadGeneratorListItem(props: ILoadGeneratorItemProps) {

    const [deleteDialogState, setDeleteDialogState] = useState(false);

    const toggleDialog = () => {
        setDeleteDialogState(p => !p);
    }

    const {organisationId} = useParams();
    const handleRevoke = async () => {

        await axiosAuthenticatedClient.delete(`/api/organisations/${organisationId}/load-generators/credentials/${props.loadGenerator.id}`);
        setDeleteDialogState(false);
        props.onDelete(props.loadGenerator.id);

    }

    return (
        <>

            <TableRow key={props.loadGenerator.id}>
                <TableCell align={"left"}>
                    {props.loadGenerator.name}
                </TableCell>
                <TableCell align={"left"}>
                    {props.loadGenerator.apiKey}
                </TableCell>
                <TableCell align={"left"}>
                    <Link sx={{cursor: "pointer"}} onClick={toggleDialog}>
                        Revoke
                    </Link>
                </TableCell>
            </TableRow>

            <Dialog onClose={toggleDialog} open={deleteDialogState}>

                <DialogTitle>Confirm Delete</DialogTitle>

                <DialogContent>

                    <Typography>
                        Are you sure you want to revoke these credentials?
                    </Typography>

                </DialogContent>

                <DialogActions>

                    <Button onClick={handleRevoke}>Revoke</Button>
                    <Button onClick={toggleDialog} color={"secondary"}>Cancel</Button>

                </DialogActions>

            </Dialog>

        </>
    )

}