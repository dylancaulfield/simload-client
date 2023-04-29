import {IFinalResultInterval} from "./IFinalResultInterval";
import {IFinalResultScenario} from "./IFinalResultScenario";

export interface IFinalResult {
    meanResponseTime: number,
    maxResponseTime: number,
    minResponseTime: number,
    totalRequests: number,
    requestsPerSecond: number,
    scenariosRan: number,
    clientErrorRate: number,
    serverErrorRate: number,
    totalErrorRate: number,
    minuteIntervals: IFinalResultInterval[],
    scenarios: IFinalResultScenario[]
}