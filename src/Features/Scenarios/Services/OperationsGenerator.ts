import {IEntry, IWebSocketMessage} from "./HarParser";
import {v4 as uuidv4} from "uuid";

const typesToSave = ["xhr", "fetch", "document", "manifest"]

export default function generateOperations(entries: IEntry[]): IOperation[] {

    const operations: IOperation[] = [];

    // Create Operations
    for (const entry of entries) {

        // HTTP
        if (!entry._webSocketMessages || !entry._webSocketMessages?.length) {

            const {scheme, host, path} = createUrl(entry.request.url);
            const request: IRequest = {
                scheme,
                host,
                path,
                method: entry.request.method,
                headers: entry.request.headers,
                query: entry.request.queryString,
                cookies: entry.request.cookies,
                body: entry.request.postData?.text ?? "",
            }

            const response: IResponse = {
                body: typesToSave.includes(entry._resourceType) ? entry.response.content.text : "Response not saved",
                headers: entry.response.headers,
                cookies: entry.response.cookies,
                redirectUrl: entry.response.redirectUrl,
                status: entry.response.status,
            }

            const operation: IOperation = {
                time: createDate(entry.startedDateTime),
                operationId: uuidv4(),
                originalRequest: request,
                originalResponse: response,
                request: request,
                type: OperationType.Http,
                duration: entry.time
            }

            operations.push(operation);

            continue;
        }

        // WebSocket
        const channelType = determineWebSocketChannelType(entry._webSocketMessages![0]);

        const {scheme, host, path} = createUrl(entry.request.url);
        const channelRequest: IRequest = {
            scheme,
            host,
            path,
            method: entry.request.method,
            headers: entry.request.headers,
            query: entry.request.queryString,
            cookies: entry.request.cookies,
            body: entry.request.postData?.text ?? "",
        }

        const channelRequestOperation: IOperation = {
            time: createDate(entry.startedDateTime),
            operationId: uuidv4(),
            originalRequest: channelRequest,
            request: channelRequest,
            type: channelType,
            duration: entry.time
        }

        operations.push(channelRequestOperation);

        for (const webSocketMessage of entry._webSocketMessages.filter(m => m.type === "send")) {

            const {scheme, host, path} = createUrl(entry.request.url);
            const message: IRequest = {
                scheme,
                host,
                path,
                method: "",
                headers: [],
                query: [],
                cookies: [],
                body: webSocketMessage.data,
            }

            const wsOperation: IOperation = {
                time: createDate(webSocketMessage.time),
                operationId: uuidv4(),
                originalRequest: message,
                request: message,
                type: channelType + 1,
                parentId: channelRequestOperation.operationId,
                duration: 0
            }

            operations.push(wsOperation);

        }

    }

    return operations;

}

function determineWebSocketChannelType(webSocketMessage: IWebSocketMessage): OperationType {

    switch (webSocketMessage.data) {
        case '{\"protocol\":\"json\",\"version\":1}\u001e':
            return OperationType.SignalRChannel;
        case '{\"type\":\"connection_init\",\"payload\":{}}':
            return OperationType.GraphQLChannel;
        default:
            return OperationType.RawWebSocketChannel
    }

}

function createDate(value: string | number): Date {

    if (typeof value == "string") {
        return new Date(value);
    }

    const t = value * 1000;
    return new Date(t);

}

interface IUrl {
    scheme: string,
    host: string,
    path: string
}

function createUrl(value: string): IUrl {

    const a = document.createElement('a');
    a.setAttribute("href", value);

    const host = a.port ? `${a.hostname}:${a.port}` : a.hostname;

    return {
        scheme: a.protocol,
        host,
        path: a.pathname
    }

}

export interface IScenario {
    code: string,
    operations: IOperation[]
}

export interface IOperation {
    operationId: string
    originalRequest: IRequest,
    originalResponse?: IResponse,
    request: IRequest,
    type: OperationType
    parentId?: string,
    time?: Date,
    duration?: number
}

export interface IRequest {
    scheme: string,
    method: string,
    host: string,
    path: string,
    query: IQueryParam[],
    headers: IHeader[],
    cookies: ICookie[],
    body: string,
}

export enum OperationType {
    Http = 0,
    RawWebSocketChannel = 1,
    RawWebSocketMessage = 2,
    SignalRChannel = 3,
    SignalRMessage = 4,
    GraphQLChannel = 5,
    GraphQLMessage = 6
}

interface ICookie {
    domain: string,
    expires: Date,
    httpOnly: boolean,
    name: string,
    path: string,
    secure: boolean,
    value: string
}

interface IHeader {
    name: string,
    value: string
}

interface IQueryParam {
    name: string,
    value: string
}

export interface IResponse {
    body: string,
    headers: IHeader[],
    cookies: ICookie[],
    redirectUrl: string,
    status: number,
}


