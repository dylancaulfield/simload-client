export interface IEntry {
    cache: object,
    connection: string,
    pageref: string,
    request: IRequest,
    response: IResponse,
    serverIPAddress: string,
    startedDateTime: string,
    time: number,
    timings: ITiming,
    _resourceType: string,
    _webSocketMessages?: IWebSocketMessage[]
}

interface ITiming {
    blocked: number,
    connect: number,
    dns: number,
    receive: number,
    send: number,
    ssl: number,
    wait: number,
}

interface IRequest {
    bodySize: number,
    cookies: ICookie[],
    headers: IHeader[],
    headersSize: number,
    httpVersion: string,
    method: string,
    queryString: IQuery[],
    url: string
    postData?: IPostData
}

interface IPostData {
    mimeType: string,
    text: string
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

interface IQuery {
    name: string,
    value: string
}

interface IResponse {
    bodySize: number,
    content: IContent,
    cookies: ICookie[],
    headers: IHeader[],
    headersSize: number,
    httpVersion: string,
    redirectUrl: string,
    status: number,
    statusText: string
}

interface IContent {
    compression: number,
    mimeType: string,
    size: number,
    text: string
}

export interface IWebSocketMessage {
    data: string,
    opcode: number,
    time: number,
    type: string // send / receive
}

export default function parseHar(har: string): IEntry[] {

    return JSON.parse(har).log.entries as IEntry[]

}