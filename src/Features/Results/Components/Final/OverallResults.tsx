import {IFinalResult} from "../../Models/IFinalResult";
import {Box, Divider, Grid, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import React from "react";

export interface IOverallResultsProps {
    result?: IFinalResult
}

export default function OverallResults(props: IOverallResultsProps) {

    if (!props.result) return <></>

    return (
        <>

            <Box sx={{mb: 3}}>

                <Typography sx={{display: "inline-block"}} variant={"h6"}>Overall Statistics</Typography>

            </Box>

            <Divider sx={{mb: 3}}/>

            <Grid container spacing={2}>

                <Grid item sm={6}>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Mean Response Time</TableCell>
                                <TableCell>{props.result.meanResponseTime.toFixed(2)} ms</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Min Response Time</TableCell>
                                <TableCell>{props.result.minResponseTime} ms</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Max Response Time</TableCell>
                                <TableCell>{props.result.maxResponseTime} ms</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Requests</TableCell>
                                <TableCell>{props.result.totalRequests}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Requests Per Second</TableCell>
                                <TableCell>{props.result.requestsPerSecond.toFixed(2)} req/s</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                </Grid>

                <Grid item sm={6}>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Scenarios Ran</TableCell>
                                <TableCell>{props.result.scenariosRan}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>4XX Error Rate</TableCell>
                                <TableCell>{props.result.clientErrorRate.toFixed(2)} %</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>5XX Error Rate</TableCell>
                                <TableCell>{props.result.serverErrorRate.toFixed(2)} %</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Error Rate</TableCell>
                                <TableCell>{props.result.totalErrorRate.toFixed(2)} %</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </Grid>

            </Grid>


        </>


    )

}