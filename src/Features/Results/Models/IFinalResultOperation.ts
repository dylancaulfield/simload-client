export interface IFinalResultOperation {
    scenarioId: string,
    scenarioName: string,
    operationId: string,
    method: string,
    fullUrl: string,
    meanResponseTime: number,
    maxResponseTime: number,
    minResponseTime: number,
    clientErrorRate: number,
    serverErrorRate: number,
    totalErrorRate: number,
}