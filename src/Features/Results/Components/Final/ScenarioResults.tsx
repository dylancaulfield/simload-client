import {
    AppBar,
    Box,
    Container,
    Dialog,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {IFinalResult} from "../../Models/IFinalResult";
import {ArrowBack} from "@mui/icons-material";
import {SlideLeftTransition} from "../../../../Common/SlideTransitions";

export interface IScenarioResultsProps {
    result?: IFinalResult
}

export default function ScenarioResults(props: IScenarioResultsProps) {

    const [openScenario, setOpenScenario] = useState(-1);

    if (!props.result?.scenarios) return <></>

    const scenarioListItems = props.result.scenarios.map((s, i) => {
        return (
            <>

                <Box key={i}>
                    <ListItemButton onClick={() => setOpenScenario(i)}>
                        <ListItem>
                            {s.scenarioName}
                        </ListItem>
                    </ListItemButton>

                    <Dialog fullScreen open={openScenario === i} onClose={() => setOpenScenario(-1)}
                            TransitionComponent={SlideLeftTransition}>

                        <AppBar color={"secondary"} sx={{position: 'relative'}}>
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={() => setOpenScenario(-1)}
                                    aria-label="close"
                                >
                                    <ArrowBack/>
                                </IconButton>
                                <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                    {s.scenarioName}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <Box sx={{p: 3}}>

                            <Container maxWidth={"xl"} sx={{mb: 3}}>

                                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                                    <Grid container spacing={2}>

                                        <Grid item sm={6}>

                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>Mean Response Time</TableCell>
                                                        <TableCell>{s.meanResponseTime.toFixed(2)} ms</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Min Response Time</TableCell>
                                                        <TableCell>{s.minResponseTime} ms</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Max Response Time</TableCell>
                                                        <TableCell>{s.maxResponseTime} ms</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Times Ran</TableCell>
                                                        <TableCell>{s.timesRan}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                        </Grid>

                                        <Grid item sm={6}>

                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>4XX Error Rate</TableCell>
                                                        <TableCell>{s.clientErrorRate.toFixed(2)} %</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>5XX Error Rate</TableCell>
                                                        <TableCell>{s.serverErrorRate.toFixed(2)} %</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>Total Error Rate</TableCell>
                                                        <TableCell>{s.totalErrorRate.toFixed(2)} %</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                        </Grid>

                                    </Grid>

                                </Paper>

                                <Paper elevation={3} sx={{p: 3, mb: 3}}>

                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Method</TableCell>
                                                <TableCell>URL</TableCell>
                                                <TableCell>Mean Response Time</TableCell>
                                                <TableCell>Min Response Time</TableCell>
                                                <TableCell>Max Response Time</TableCell>
                                                <TableCell>4XX Error Rate</TableCell>
                                                <TableCell>5XX Error Rate</TableCell>
                                                <TableCell>Total Error Rate</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {s.operations
                                                .sort((a, b) => a.maxResponseTime > b.maxResponseTime ? -1 : 1)
                                                .map(o => {
                                                    return (
                                                        <TableRow key={o.operationId}>
                                                            <TableCell>{o.method}</TableCell>
                                                            <TableCell>{o.fullUrl}</TableCell>
                                                            <TableCell>{o.meanResponseTime}</TableCell>
                                                            <TableCell>{o.minResponseTime}</TableCell>
                                                            <TableCell>{o.maxResponseTime}</TableCell>
                                                            <TableCell>{o.clientErrorRate}</TableCell>
                                                            <TableCell>{o.serverErrorRate}</TableCell>
                                                            <TableCell>{o.totalErrorRate}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>

                                </Paper>

                            </Container>


                        </Box>

                    </Dialog>
                </Box>


            </>

        )
    });

    return (
        <>

            <Box sx={{mb: 3}}>

                <Typography sx={{display: "inline-block"}} variant={"h6"}>Scenarios</Typography>

            </Box>

            <Divider sx={{mb: 3}}/>

            <List>
                {scenarioListItems}
            </List>

        </>
    )

}