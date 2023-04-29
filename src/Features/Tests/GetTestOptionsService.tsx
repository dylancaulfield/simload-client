import axiosAuthenticatedClient from "../../Utilities/AxiosAuthenticatedClient";

export interface IGetTestOptionsRequest {
    organisationId: string,
    projectId: string
}

export interface ITestOptions {
    loadGenerators: ITestOptionsLoadGenerator[],
    scenarios: ITestOptionsScenario[]
}

interface ITestOptionsLoadGenerator {
    id: string,
    available: boolean,
    ipAddress: string,
    lastUpdated: string
}

interface ITestOptionsScenario {
    id: string,
    name: string
}

export default async function getTestOptions(request: IGetTestOptionsRequest): Promise<ITestOptions | string> {

    try {
        return (await axiosAuthenticatedClient.get<ITestOptions>(`/api/organisations/${request.organisationId}/projects/${request.projectId}/tests/options`)).data;
    } catch (e) {
        return (e as Error).message;
    }

}