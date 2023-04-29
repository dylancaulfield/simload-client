import {IOperation, IRequest, IResponse, IScenario, OperationType} from "./OperationsGenerator";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

interface IScenarioResponse {
    name: string,
    description: string,
    code: string,
    operations: object,
    lastUpdated: Date
}

interface IScenarioResponseOperation {
    originalRequest: IRequest,
    originalResponse?: IResponse,
    request: IRequest,
    type: OperationType
}

export default async function retrieveScenario(projectId: string, scenarioId: string): Promise<IScenario | null> {

    try {
        const {data} = await axiosAuthenticatedClient.get<IScenarioResponse>(`/api/projects/${projectId}/scenarios/${scenarioId}`);

        const operations: IOperation[] = [];
        Object.keys(data.operations).forEach(operationId => {

            // @ts-ignore
            const operation: any = data.operations[operationId];

            operations.push({
                operationId,
                request: operation.request,
                originalRequest: operation.originalRequest,
                originalResponse: operation.originalResponse,
                type: operation.type,
            });

        });

        return {
            operations,
            code: data.code
        }


    } catch (e) {
        console.log(e);
        return null;
    }

}