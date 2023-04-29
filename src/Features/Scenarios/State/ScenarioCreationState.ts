import {atom, selector} from "recoil";
import {IOperation} from "../Services/OperationsGenerator";

export interface IScenarioCreationState {
    operations: IOperation[],
    selectedHosts: string[],
    flow: CreateScenarioFlow
}

export enum CreateScenarioFlow {
    Upload,
    Filter,
    Finalise
}

export const ScenarioCreationState = atom<IScenarioCreationState>({
    key: "ScenarioCreationState",
    default: {
        operations: [],
        selectedHosts: [],
        flow: CreateScenarioFlow.Upload
    }
});

const ScenarioCreationStateHosts = selector<string[]>({
    key: "ScenarioCreationStateHosts",
    get: ({get}): string[] => {

        const {operations} = get(ScenarioCreationState);
        const hosts: string[] = [];

        for (const operation of operations) {

            if (!hosts.includes(operation.request.host))
                hosts.push(operation.request.host);

        }

        return hosts;

    }
});

interface IHostToggle {
    host: string,
    selected: boolean
}

export const ScenarioCreationStateHostToggles = selector<IHostToggle[]>({
    key: "ScenarioCreationStateHostToggles",
    get: ({get}): IHostToggle[] => {

        const {selectedHosts} = get(ScenarioCreationState);
        const hosts = get(ScenarioCreationStateHosts);

        return hosts.map(host => {
            return {
                host,
                selected: selectedHosts.includes(host)
            }
        });

    }
});

export const ScenarioCreationStateFilteredOperations = selector<IOperation[]>({
    key: "ScenarioCreationStateFilteredOperations",
    get: ({get}): IOperation[] => {

        const {operations, selectedHosts} = get(ScenarioCreationState);

        return operations
            .filter(o => selectedHosts.includes(o.request.host))

    }
});