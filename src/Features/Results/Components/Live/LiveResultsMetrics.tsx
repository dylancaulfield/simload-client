import {Grid} from "@mui/material";
import LiveMetric from "./LiveMetric";
import {ILiveResult} from "../../Models/ILiveResult";

export interface ILiveResultsMetricsProps {
    results?: ILiveResult
}

export default function LiveResultsMetrics(props: ILiveResultsMetricsProps) {

    if (!props.results) {
        return <></>
    }

    return (

        <Grid container spacing={2}>

            <LiveMetric name={"Mean Response Time"} value={props.results.meanResponseTime!.toFixed(0).toString()}
                        unit={"ms"}/>

            <LiveMetric name={"Max Response Time"} value={props.results.maxResponseTime!.toString()} unit={"ms"}/>

            <LiveMetric name={"Min Response Time"} value={props.results.minResponseTime!.toString()} unit={"ms"}/>

            <LiveMetric name={"Target User Count"} value={props.results.targetUserCount!.toString()}/>

            <LiveMetric name={"Scenarios Ran"} value={props.results.scenariosRan!.toString()}/>

            <LiveMetric name={"Total Requests"} value={props.results.totalRequests!.toString()}/>

            <LiveMetric name={"Throughput"} value={props.results.requestsPerSecond!.toFixed(2).toString()}
                        unit={"req/s"}/>

            <LiveMetric name={"Total Error Rate"} value={props.results.totalErrorRate!.toFixed(2).toString()}
                        unit={"%"}/>

            <LiveMetric name={"4XX Error Rate"} value={props.results.clientErrorRate!.toFixed(2).toString()}
                        unit={"%"}/>

            <LiveMetric name={"5XX Error Rate"} value={props.results.serverErrorRate!.toFixed(2).toString()}
                        unit={"%"}/>

        </Grid>

    )

}