import React from "react";
import {CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import LoadGeneratorListItem from "./LoadGeneratorListItem";
import {ILoadGenerator} from "./LoadGeneratorsTab";
import {filterText} from "../../../Utilities/Filter";


export interface ILoadGeneratorListProps {
    loadGenerators: ILoadGenerator[] | undefined
    filter: string,

    onDelete(loadGeneratorId: string): void
}

export default function LoadGeneratorList(props: ILoadGeneratorListProps) {

    const loadGeneratorList = () => {

        if (!props.loadGenerators) {
            return <CircularProgress color={"primary"}></CircularProgress>
        }

        const loadGenerators = props.loadGenerators!
            .filter(l => filterText(l, props.filter))
            .map(l => <LoadGeneratorListItem loadGenerator={l}
                                             onDelete={() => props.onDelete(l.id)}></LoadGeneratorListItem>);

        if (!loadGenerators.length) {
            return <Typography sx={{mt: 3}} variant={"body1"}>No load generator credentials found.</Typography>
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>API Key</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loadGenerators}
                </TableBody>
            </Table>
        )

    }

    return loadGeneratorList();

}

