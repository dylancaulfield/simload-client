import {atom, selector} from "recoil";
import {IOperation, IScenario} from "../Services/OperationsGenerator";

// This is the initial state of the operations when retrieved, it doesn't
// change unless an update is sent to the server
export const ScenarioEditingInitialState = atom<IScenario>({
    key: "ScenarioEditingInitialState",
    default: {
        code: "",
        operations: []
    }
});

// This is the new code if it has been updated or null if not
export const ScenarioEditingUpdatedCodeState = atom<string | null>({
    key: "ScenarioEditingUpdatedCodeState",
    default: null
});

// This is a list of the operations that have been created
export const ScenarioEditingCreatedOperationsState = atom<IOperation[]>({
    key: "ScenarioEditingCreatedOperationsState",
    default: []
});

// This is a list of the operations that have been updated, in their updated state
export const ScenarioEditingUpdatedOperationsState = atom<IOperation[]>({
    key: "ScenarioEditingUpdatedOperationsState",
    default: []
});

// This is a list of operations marked for deletion
export const ScenarioEditingDeletedOperationsState = atom<IOperation[]>({
    key: "ScenarioEditingDeletedOperationsState",
    default: []
});

interface IScenarioEditingChangesSummary {
    created: IOperation[],
    updated: IOperation[],
    deleted: IOperation[],
    code: string | null
}

// This is an aggregation of the changed operations and code
export const ScenarioEditingChangesAggregationSelector = selector<IScenarioEditingChangesSummary>({
    key: "ScenarioEditingChangesAggregationSelector",
    get: ({get}): IScenarioEditingChangesSummary => {

        const createdOperations = get(ScenarioEditingCreatedOperationsState);
        const updatedOperations = get(ScenarioEditingUpdatedOperationsState);
        const deletedOperations = get(ScenarioEditingDeletedOperationsState);
        const updatedCode = get(ScenarioEditingUpdatedCodeState);

        return {
            created: createdOperations,
            updated: updatedOperations,
            deleted: deletedOperations,
            code: updatedCode
        }

    }
});

interface IScenarioWithChanges {
    code: string,
    operations: IOperation[]
}

// This is the final selector the editor will use to display it's state
export const ScenarioEditingWithChangesSelector = selector<IScenarioWithChanges>({
    key: "ScenarioEditingWithChangesSelector",
    get: ({get}): IScenarioWithChanges => {

        const initialState = get(ScenarioEditingInitialState) ?? {};
        const initialCode = initialState.code ?? "";
        const initialOperations = initialState.operations ?? [];
        const changes = get(ScenarioEditingChangesAggregationSelector);

        let operations: IOperation[] = [];
        const deletedOperationIds = changes.deleted.map(o => o.operationId);

        // Fill with current values except for deleted ids
        for (const initialOperation of initialOperations) {
            if (deletedOperationIds.includes(initialOperation.operationId)) continue;
            operations.push(initialOperation);
        }

        // Add created
        for (const createdOperation of changes.created) {
            operations.push(createdOperation);
        }

        // Update updated
        for (const updatedOperation of changes.updated) {
            operations = operations.map(o => {
                if (o.operationId == updatedOperation.operationId) {
                    return updatedOperation;
                }
                return o;
            });
        }

        return {
            code: changes.code ?? initialCode,
            operations
        }

    }
});