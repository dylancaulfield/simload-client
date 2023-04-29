export interface IGraphColours {
    meanResponseTime: string,
    maxResponseTime: string,
    minResponseTime: string,
    targetUserCount: string,
    totalRequests: string,
    requestsPerSecond: string,
    clientErrorRate: string,
    serverErrorRate: string,
    totalErrorRate: string,
}

export const GraphColours: IGraphColours = {
    clientErrorRate: "#f70000",
    maxResponseTime: "#038cfc",
    meanResponseTime: "#03c2fc",
    minResponseTime: "#03dbfc",
    requestsPerSecond: "#82ca9d",
    serverErrorRate: "#f70000",
    targetUserCount: "#8884d8",
    totalErrorRate: "#f70000",
    totalRequests: "#8884d8"

}