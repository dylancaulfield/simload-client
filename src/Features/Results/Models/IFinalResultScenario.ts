import {IFinalResultOperation} from "./IFinalResultOperation";

export interface IFinalResultScenario {
    scenarioId: string,
    scenarioName: string,
    meanResponseTime: number,
    maxResponseTime: number,
    minResponseTime: number,
    clientErrorRate: number,
    serverErrorRate: number,
    totalErrorRate: number,
    timesRan: number,
    operations: IFinalResultOperation[]
}