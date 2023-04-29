import {ITest, TestStatus} from "./TestsTab";
import {CircularProgress, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {filterText} from "../../../Utilities/Filter";
import React from "react";
import {Link as RouterLink, useParams} from "react-router-dom";

export interface ITestListProps {
    tests: ITest[] | undefined,
    filter: string
}

export default function TestList(props: ITestListProps) {

    const {organisationId, projectId} = useParams();

    const testLink = (test: ITest) => {

        switch (test.status) {
            case TestStatus.Complete:
                return (
                    <TableCell>
                        <Link component={RouterLink}
                              to={`/organisations/${organisationId}/projects/${projectId}/tests/${test.id}/results`}>
                            {test.name}
                        </Link>
                    </TableCell>
                )
            case TestStatus.InProgress:
                return (
                    <TableCell>
                        <Link component={RouterLink}
                              to={`/organisations/${organisationId}/projects/${projectId}/tests/${test.id}/live`}>
                            {test.name}
                        </Link>
                    </TableCell>
                )
            default:
                return (
                    <TableCell>
                        {test.name}
                    </TableCell>
                )
        }

    }
    const testList = () => {

        if (!props.tests) {
            return <CircularProgress color={"primary"}></CircularProgress>
        }

        const tests = props.tests!
            .filter(t => filterText(t, props.filter))
            .map(t => (
                <TableRow key={t.id}>
                    {testLink(t)}
                    <TableCell>{t.status === TestStatus.Complete ? "Completed" : "In Progress"}</TableCell>
                    <TableCell>{new Date(t.startedAt).toLocaleString()}</TableCell>
                    <TableCell>{t.status === TestStatus.Complete ? new Date(t.endedAt).toLocaleString() : ""}</TableCell>
                </TableRow>
            ));

        if (!tests.length) {
            return <Typography sx={{mt: 3}} variant={"body1"}>No tests found.</Typography>
        }

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Started</TableCell>
                        <TableCell>Ended</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tests}
                </TableBody>
            </Table>
        )

    }

    return testList();

}