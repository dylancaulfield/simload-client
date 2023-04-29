export interface ILiveResult {
    meanResponseTime: number,
    maxResponseTime: number,
    minResponseTime: number,
    targetUserCount: number,
    totalRequests: number,
    requestsPerSecond: number,
    clientErrorRate: number,
    serverErrorRate: number,
    totalErrorRate: number,
    progress: number,
    scenariosRan: number
}