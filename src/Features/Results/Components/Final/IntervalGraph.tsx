import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {IFinalResultInterval} from "../../Models/IFinalResultInterval";
import {IEnabledMetrics} from "./IntervalGraphController";
import {Paper} from "@mui/material";

export interface IIntervalGraphProps {
    intervals: IFinalResultInterval[],
    enabledMetrics: IEnabledMetrics,
    height: number,
    elevated: boolean
}

export default function IntervalGraph(props: IIntervalGraphProps) {

    const responseTimeAxis = (): boolean => props.enabledMetrics.meanResponseTime || props.enabledMetrics.maxResponseTime || props.enabledMetrics.minResponseTime;
    const numberAxis = (): boolean => props.enabledMetrics.totalRequests || props.enabledMetrics.targetUserCount || props.enabledMetrics.requestsPerSecond;
    const errorRateAxis = (): boolean => props.enabledMetrics.totalErrorRate || props.enabledMetrics.clientErrorRate || props.enabledMetrics.serverErrorRate;

    const floor = (value: number, scale: number): number => Math.floor(value / scale) * scale;
    const ceil = (value: number, scale: number): number => Math.ceil(value / scale) * scale;

    const dateFormatter = (date: string): string => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} @ ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    }

    return (
        <>

            <Paper elevation={props.elevated ? 3 : 0} sx={{p: props.elevated ? 3 : 0, pt: 3}}>

                <ResponsiveContainer width={"100%"} height={props.height}>

                    <LineChart data={props.intervals}>

                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis tickFormatter={dateFormatter} dataKey="minute"/>

                        {numberAxis() && <YAxis yAxisId="virtualUserCount"
                                                domain={[((v: number) => floor(v, 10)), (v: number) => ceil(v, 10)]}/>}

                        {errorRateAxis() && <YAxis yAxisId="errorRate" unit={"%"} stroke={"#f70000"}
                                                   domain={[((v: number) => floor(v, 10)), (v: number) => ceil(v, 10)]}
                                                   orientation={"right"}/>}

                        {responseTimeAxis() && <YAxis yAxisId="responseTimes" unit={"ms"} stroke={"#03c2fc"}
                                                      domain={[((v: number) => floor(v, 100)), (v: number) => ceil(v, 100)]}
                                                      orientation="right"/>}

                        <Tooltip labelFormatter={dateFormatter}/>
                        <Legend/>


                        {props.enabledMetrics.meanResponseTime &&
                            <Line yAxisId="responseTimes" type="monotone" dataKey="meanResponseTime"
                                  name={"Mean Response Time"} unit={"ms"} stroke={"#03c2fc"} legendType={"circle"}/>}

                        {props.enabledMetrics.minResponseTime &&
                            <Line yAxisId="responseTimes" type="monotone" dataKey="minResponseTime"
                                  name={"Min Response Time"} unit={"ms"} stroke="#03dbfc" legendType={"star"}/>}

                        {props.enabledMetrics.maxResponseTime &&
                            <Line yAxisId="responseTimes" type="monotone" dataKey="maxResponseTime"
                                  name={"Max Response Time"} unit={"ms"} stroke="#038cfc" legendType={"square"}/>}

                        {props.enabledMetrics.requestsPerSecond &&
                            <Line yAxisId="virtualUserCount" type="monotone" dataKey="requestsPerSecond"
                                  name={"Requests per second"} stroke="#82ca9d" legendType={"line"}/>}

                        {props.enabledMetrics.totalRequests &&
                            <Line yAxisId="virtualUserCount" type="monotone" dataKey="totalRequests"
                                  name={"Total Requests"}
                                  stroke="#8884d8" legendType={"diamond"}/>}

                        {props.enabledMetrics.targetUserCount &&
                            <Line yAxisId="virtualUserCount" type="monotone" dataKey="targetUserCount"
                                  name={"Virtual Users"}
                                  stroke="#8884d8" legendType={"diamond"}/>}

                        {props.enabledMetrics.totalErrorRate &&
                            <Line yAxisId="errorRate" type="monotone" dataKey="totalErrorRate" name={"Total Error Rate"}
                                  unit={"%"}
                                  stroke="#f70000" legendType={"cross"}/>}

                        {props.enabledMetrics.serverErrorRate &&
                            <Line yAxisId="errorRate" type="monotone" dataKey="clientErrorRate" name={"5XX Error Rate"}
                                  unit={"%"}
                                  stroke="#f70000" legendType={"cross"}/>}

                        {props.enabledMetrics.clientErrorRate &&
                            <Line yAxisId="errorRate" type="monotone" dataKey="serverErrorRate" name={"4XX Error Rate"}
                                  unit={"%"}
                                  stroke="#f70000" legendType={"cross"}/>}

                    </LineChart>

                </ResponsiveContainer>

            </Paper>


        </>
    )

}