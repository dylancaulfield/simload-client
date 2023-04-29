import {
    AppBar,
    Box,
    Button,
    Dialog,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import {Close, Fullscreen} from "@mui/icons-material";
import IntervalGraph from "./IntervalGraph";
import React, {ChangeEvent, useState} from "react";
import {IFinalResultInterval} from "../../Models/IFinalResultInterval";
import {SlideUpTransition} from "../../../../Common/SlideTransitions";

export interface IIntervalGraphControllerProps {
    intervals?: IFinalResultInterval[]
}

export interface IEnabledMetrics {
    meanResponseTime: boolean,
    maxResponseTime: boolean,
    minResponseTime: boolean,
    targetUserCount: boolean,
    totalRequests: boolean,
    requestsPerSecond: boolean,
    clientErrorRate: boolean,
    serverErrorRate: boolean,
    totalErrorRate: boolean,
}

export default function IntervalGraphController(props: IIntervalGraphControllerProps) {

    if (!props.intervals) return <></>

    const [fullScreenState, setFullScreenState] = useState(false);
    const [enableMetricsState, setEnabledMetricsState] = useState<IEnabledMetrics>({
        meanResponseTime: true,
        maxResponseTime: false,
        minResponseTime: true,
        requestsPerSecond: true,
        totalRequests: false,
        targetUserCount: true,
        totalErrorRate: true,
        clientErrorRate: false,
        serverErrorRate: false
    });

    const toggleFullScreen = () => setFullScreenState(p => !p);

    const toggleMetric = (event: ChangeEvent<HTMLInputElement>) => setEnabledMetricsState(p => {
        return {
            ...p,
            [event.target.name]: event.target.checked
        }
    });

    return (
        <>

            <Box sx={{mb: 3}}>

                <Typography sx={{display: "inline-block"}} variant={"h6"}>Minute Intervals</Typography>

                <Button sx={{float: "right"}} onClick={toggleFullScreen} variant={"contained"} color={"secondary"}
                        endIcon={<Fullscreen/>}>Expand</Button>

            </Box>

            <Divider sx={{mb: 3}}/>

            <Dialog fullScreen open={fullScreenState} onClose={toggleFullScreen}
                    TransitionComponent={SlideUpTransition}>

                <AppBar color={"secondary"} sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={toggleFullScreen}
                            aria-label="close"
                        >
                            <Close/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            Result Graph
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{p: 3}}>

                    <Grid container spacing={2}>

                        <Grid item sm={3} md={2}>

                            <Paper elevation={3} sx={{p: 3, width: "100%"}}>

                                <Typography variant={"h6"} sx={{mb: 3}}>Metrics</Typography>

                                <FormGroup>

                                    <FormControlLabel control={<Switch checked={enableMetricsState.meanResponseTime}
                                                                       onChange={toggleMetric} name={"meanResponseTime"}
                                                                       color={"secondary"}/>}
                                                      label="Mean response time"/>
                                    <FormControlLabel control={<Switch checked={enableMetricsState.minResponseTime}
                                                                       onChange={toggleMetric} name={"minResponseTime"}
                                                                       color={"secondary"}/>}
                                                      label="Min response time"/>
                                    <FormControlLabel control={<Switch checked={enableMetricsState.maxResponseTime}
                                                                       onChange={toggleMetric} name={"maxResponseTime"}
                                                                       color={"secondary"}/>}
                                                      label="Max response time"/>

                                    <Divider sx={{my: 1}}/>

                                    <FormControlLabel control={<Switch checked={enableMetricsState.requestsPerSecond}
                                                                       onChange={toggleMetric}
                                                                       name={"requestsPerSecond"} color={"secondary"}/>}
                                                      label="Requests per second"/>
                                    <FormControlLabel control={<Switch checked={enableMetricsState.totalRequests}
                                                                       onChange={toggleMetric} name={"totalRequests"}
                                                                       color={"secondary"}/>} label="Total requests"/>

                                    <Divider sx={{my: 1}}/>

                                    <FormControlLabel control={<Switch checked={enableMetricsState.targetUserCount}
                                                                       onChange={toggleMetric} name={"targetUserCount"}
                                                                       color={"secondary"}/>}
                                                      label="Target user count"/>

                                    <Divider sx={{my: 1}}/>

                                    <FormControlLabel control={<Switch checked={enableMetricsState.totalErrorRate}
                                                                       onChange={toggleMetric} name={"totalErrorRate"}
                                                                       color={"secondary"}/>} label="Total error rate"/>
                                    <FormControlLabel control={<Switch checked={enableMetricsState.clientErrorRate}
                                                                       onChange={toggleMetric} name={"clientErrorRate"}
                                                                       color={"secondary"}/>} label="4XX error rate"/>
                                    <FormControlLabel control={<Switch checked={enableMetricsState.serverErrorRate}
                                                                       onChange={toggleMetric} name={"serverErrorRate"}
                                                                       color={"secondary"}/>} label="5XX error rate"/>

                                </FormGroup>

                            </Paper>

                        </Grid>

                        <Grid item sm={9} md={10}>

                            <IntervalGraph elevated={true} enabledMetrics={enableMetricsState} height={750}
                                           intervals={props.intervals}/>

                        </Grid>

                    </Grid>

                </Box>

            </Dialog>

            <IntervalGraph elevated={false} enabledMetrics={enableMetricsState} height={500}
                           intervals={props.intervals}/>

        </>
    )

}