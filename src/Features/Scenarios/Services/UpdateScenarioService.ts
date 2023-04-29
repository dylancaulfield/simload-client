import {IOperation, IScenario} from "./OperationsGenerator";
import axiosAuthenticatedClient from "../../../Utilities/AxiosAuthenticatedClient";

export interface IUpdateScenarioRequest {
    projectId: string,
    scenarioId: string,
    code: string,
    created: IOperation[],
    updated: IOperation[],
    deleted: IOperation[]
}

export default async function updateScenario(request: IUpdateScenarioRequest): Promise<string | null> {

    const operations: any = {
        created: {},
        updated: {},
        deleted: []
    };

    for (const operation of request.created) {
        operations.created[operation.operationId] = operation;
    }
    for (const operation of request.updated) {
        operations.updated[operation.operationId] = operation;
    }
    for (const operation of request.deleted) {
        operations.deleted.push(operation.operationId);
    }

    const payload = {
        code: request.code,
        operations
    }

    try {
        await axiosAuthenticatedClient.put(`/api/projects/${request.projectId}/scenarios/${request.scenarioId}`, payload);
        return null;
    } catch (e) {
        return (e as Error).message;
    }

}